import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { APP_NAME, EMOJIS, FOUNDATION_LOGO, INVOICE_LEVELS, LOCAL_STORAGE_KEYS, SEPARATOR, URLS, WEBSITE_LOGO } from '../../config/constants'
import { ActionIcon, Box, Button, Container, Group, Image, LoadingOverlay, NumberInput, Paper, Select, Stack, TextInput, Title } from '@mantine/core'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import InvoiceHeader from '../../components/invoice/InvoiceHeader'
import InvoiceFooter from '../../components/invoice/InvoiceFooter'
import { convertJSONToFormData, formatCurrency, formatDateToYYYYMMDD, getTheme, makeRequestOne } from '../../config/config'
import ApprovalPerson from '../../components/invoice/Approvals'
import { useForm } from '@mantine/form'
import { DataTable } from 'mantine-datatable'
import { IconExclamationMark, IconInfoCircle, IconPlus, IconTrash } from '@tabler/icons'

import InvoiceInitialFieldsCashAdvance from '../../components/invoice/initial_fields/InvoiceInitialFieldsCashAdvance'
import { useAppContext } from '../../providers/appProvider'
import ApprovalsSection from '../../components/invoice/ApprovalsSection'
import { showNotification } from '@mantine/notifications'
import { displayErrors } from '../../config/functions'
import requireAuthMiddleware from '../../middleware/requireAuthMiddleware'

const SINGLE_ITEM = {
    no: "",
    description: "",
    budget_line: "",
    unit: "",
    no_of_units: "",
    unit_rate: "",
    amount: ""
}


interface ICashAdvance {
    projects: any
    user: any
    checkers: any
}

const CashAdvance = ({ projects, user, checkers }: ICashAdvance) => {

    const [budgetLines, setBudgetLines] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { user_id, token } = useAppContext()

    const form = useForm({
        initialValues: {
            level: 1,
            country: "Kenya",
            currency: "kes",
            invoice_number: "",
            name: user ? user : "",
            date: "",
            purpose: "",
            project: "",
            code: "",
            activity_end_date: "",
            expected_liquidation_date: "",
            items: Array(1).fill(SINGLE_ITEM),
            requested_by: {
                user: user,
                signature: "",
                date: "",
            },
            checker: "",
        },
        validate: {
            expected_liquidation_date: value => value === "" ? "Select date" : null,
            activity_end_date: value => value === "" ? "Select date" : null,
            date: value => value === "" ? "Select date" : null,
            purpose: value => value === "" ? "Enter Purpose" : null,
            project: value => value === "" ? "Select Project" : null,
            items: {
                no: (value: any) => value === "" ? "No is required" : null,
                description: (value: string) => value === "" ? "Description is required" : null,
                budget_line: (value: any) => value === "" ? "Select Budget line" : null,
                no_of_units: (value: any) => value === "" ? "Units Count is required" : null,
                unit_rate: (value: any) => value === "" ? "Unit Rate is required" : null,
            },
            requested_by: {
                user: (value: any) => value === "" ? "Enter Your Name" : null,
                signature: (value: any) => (value === "" || value === null) ? "Upload your Signature" : null,
                date: (value: string) => value === "" ? "Select Date" : null,
            },
            checker: value => value === "" ? "Select who to check the form" : null,
        }
    })

    const getTotal = (units: any, rate: any, index: number) => {
        if (units && units !== "" && rate && rate !== "") {
            const amt = parseFloat(units) * parseFloat(rate)
            form.setFieldValue(`items.${index}.amount`, amt)
        }
    }

    function addItem() {
        form.insertListItem('items', SINGLE_ITEM)
    }

    function removeItem(index: number) {
        form.removeListItem('items', index)
    }

    function getAmountTotal(items?: any) {
        if (items) {
            return items?.reduce((old: number, item: any, i: number) => (item?.amount !== "" || item?.amount !== null) ? old + item?.amount : old, 0)
        }
        return form.values?.items?.reduce((old: number, item: any, i: number) => (item?.amount !== "" || item?.amount !== null) ? old + item?.amount : old, 0)
    }

    function loadBudgetLines() {
        makeRequestOne({
            url: URLS.BUDGET_LINES,
            method: "GET",
            extra_headers: {
                authorization: `Bearer ${token}`
            },
            params: {
                project: form.values.project,
                fields: 'id,code',
                limit: 150
            }
        }).then((res: any) => {
            setBudgetLines(res?.data?.results)
        }).catch(() => { })
    }

    function submitForm() {
        let data: any = structuredClone(form.values)
        data.requested_by.user = user_id

        let items: any = data.items.filter((ln: any) => ln?.description !== "")
        if (items.length === 0) {
            showNotification({
                title: "No items",
                message: "You don't have any items in your form",
                color: "red",
                icon: <IconExclamationMark />
            })
            return
        }
        setLoading(true)
        data.total = getAmountTotal(data.items)
        data.items = JSON.stringify(items)

        data.date = formatDateToYYYYMMDD(data?.date)
        data.activity_end_date = formatDateToYYYYMMDD(data?.activity_end_date)
        data.expected_liquidation_date = formatDateToYYYYMMDD(data?.expected_liquidation_date)
        let requested_by_date = formatDateToYYYYMMDD(data.requested_by.date)
        data.requested_by.date = requested_by_date
        const formData = convertJSONToFormData(data)
        makeRequestOne({
            url: URLS.CASH_ADVANCE_FORMS,
            method: "POST",
            data: formData,
            extra_headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }).then((res: any) => {
            showNotification({
                title: `Submission successful ${EMOJIS.partypopper}`,
                message: "Congratulations! Your form has been submitted successfully",
                color: "green",
                icon: <IconInfoCircle />
            })
            form.reset()
        }).catch((err) => {
            const errors = err?.response?.data
            displayErrors(form, errors)
            showNotification({
                title: "Error",
                message: "Unable to complete your request at this time! Try again later",
                color: "red",
                icon: <IconInfoCircle />
            })
        }).finally(() => {
            setLoading(false)
        })
    }


    useEffect(() => {
        loadBudgetLines()
    }, [form.values.project])

    return (
        <div>
            <Head>
                <title>{`${APP_NAME} ${SEPARATOR} Cash Advance`}</title>
            </Head>
            <Container size="lg" mt={20} my="lg">
                <Paper py={30} px={30} radius="md" sx={theme => ({
                    background: getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0]
                })}>
                    <LoadingOverlay visible={loading} />
                    <form onSubmit={form.onSubmit(values => submitForm())}>
                        <Stack spacing={20}>
                            {
                                form.values.country?.toLowerCase() === 'kenya' ?
                                    <Image mx="auto" src={WEBSITE_LOGO} width={250} alt='E4I Invoice' />
                                    :
                                    <Image mx="auto" src={FOUNDATION_LOGO} width={250} alt='E4I Invoice' />
                            }
                            <InvoiceHeader title={`CASH/ADVANCE REQUEST FORM  (${form.values?.currency?.toUpperCase()})`} form={form} />
                            <InvoiceInitialFieldsCashAdvance form={form} projects={projects} />
                            <Paper p="md">
                                <Stack spacing={10}>

                                    <DataTable
                                        horizontalSpacing="xs"
                                        verticalSpacing="md"
                                        minHeight={150}
                                        records={form.values.items}
                                        columns={[
                                            {
                                                accessor: 'no',
                                                title: "No.",
                                                width: "60px",
                                                noWrap: true,
                                                render: (entry: any, i: any) => {
                                                    return <NumberInput hideControls={true} {...form.getInputProps(`items.${i}.no`)} placeholder='No.' />
                                                }
                                            },
                                            {
                                                title: 'DESCRIPTION',
                                                accessor: 'description',
                                                width: "250px",
                                                render: (entry: any, i: any) => {
                                                    return <TextInput {...form.getInputProps(`items.${i}.description`)} placeholder="Give a description of this item" />
                                                }
                                            },
                                            {
                                                title: 'BUDGET LINE',
                                                accessor: 'budget_line',
                                                width: "100px",
                                                render: (entry: any, i: any) => {
                                                    return <Select searchable placeholder='Budget Line'
                                                        data={budgetLines ? budgetLines?.map((line: any) => ({
                                                            value: line?.code,
                                                            label: `${line?.code} ${line?.text}`,
                                                        })) : []}
                                                        {...form.getInputProps(`items.${i}.budget_line`)} />
                                                }
                                            },
                                            {
                                                title: 'UNIT',
                                                accessor: 'unit',
                                                width: "60px",
                                                render: (entry: any, i: any) => {
                                                    return <TextInput  {...form.getInputProps(`items.${i}.unit`)} placeholder="KG, PC, LTR" />
                                                }
                                            },
                                            {
                                                title: 'NO. OF UNIT(S)',
                                                accessor: 'no_of_units',
                                                width: "80px",
                                                render: (entry: any, i: any) => {
                                                    return <NumberInput hideControls={true}  {...form.getInputProps(`items.${i}.no_of_units`)} placeholder='20' onBlur={el => getTotal(form.values.items[i].no_of_units, form.values.items[i].unit_rate, i)} />
                                                }
                                            },
                                            {
                                                title: 'UNIT RATE',
                                                accessor: 'unit_rate',
                                                width: "60px",
                                                ellipsis: false,
                                                // noWrap: false,
                                                render: (entry: any, i: any) => {
                                                    return <NumberInput hideControls={true}  {...form.getInputProps(`items.${i}.unit_rate`)} placeholder='20' onBlur={el => getTotal(form.values.items[i].no_of_units, form.values.items[i].unit_rate, i)} />
                                                }
                                            },
                                            {
                                                title: `TOTAL AMOUNT (${form.values?.currency?.toUpperCase()})`,
                                                accessor: 'amount',
                                                width: "100px",
                                                render: (entry: any, i: any) => {
                                                    return <NumberInput disabled
                                                        thousandsSeparator=','
                                                        {...form.getInputProps(`items.${i}.amount`)}
                                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                                        formatter={(value) =>
                                                            !Number.isNaN(parseFloat(value))
                                                                ? `${form.values?.currency?.toUpperCase()} ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                                                : `${form.values?.currency?.toUpperCase()} `
                                                        }
                                                    />
                                                }
                                            },
                                            {
                                                accessor: "actions",
                                                title: "",
                                                width: "40px",
                                                render: (item, i: number) => (
                                                    <Group position='center'>
                                                        <ActionIcon color='red' variant='light' onClick={e => removeItem(i)}>
                                                            <IconTrash />
                                                        </ActionIcon>
                                                    </Group>
                                                )
                                            }
                                        ]}
                                    />

                                    <Group position="right">
                                        <Button radius="md" leftIcon={<IconPlus />} onClick={addItem}>Add Item</Button>
                                    </Group>
                                    <Group position="right">
                                        <Title order={3} weight={600}>Total</Title>
                                        <Title order={3} weight={600}>
                                            {`${form.values?.currency?.toUpperCase()} ${formatCurrency(getAmountTotal())}`}
                                        </Title>
                                    </Group>
                                </Stack>
                            </Paper>

                            <ApprovalsSection>
                                <ApprovalPerson person={'Requested By'} form={form} field_prefix={'requested_by'} field_name={'user'} active={true} level={INVOICE_LEVELS.LEVEL_1} />
                                <Box py="lg">
                                    <Select searchable label="Who is to check the form?" data={checkers?.map((checker: any) => ({
                                        value: checker?.id?.toString(),
                                        label: checker?.full_name || "No name",
                                    })) || []} {...form.getInputProps('checker')} />
                                </Box>
                                <ApprovalPerson person={'Checked By'} form={form} field_prefix={'checked_by'} field_name={'user'} active={false} level={INVOICE_LEVELS.LEVEL_1} />
                                <ApprovalPerson person={'Approved By'} form={form} field_prefix={'approved_by'} field_name={'user'} active={false} level={INVOICE_LEVELS.LEVEL_1} />
                                <ApprovalPerson person={'Amount Received'} form={form} field_prefix={'amount_received'} field_name={'amount'} active={false} level={INVOICE_LEVELS.LEVEL_1} />
                            </ApprovalsSection>
                            <InvoiceFooter />
                            <Group position='center'>
                                <Button type='submit'>Submit</Button>
                            </Group>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export const getServerSideProps = async (context: any) => {
    requireAuthMiddleware(context.req, context.res, () => { })

    const cookies = context.req.cookies
    const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.user]

    const user = JSON.parse(userDetails_ ?? "null")
    const token = cookies[LOCAL_STORAGE_KEYS.token]

    const projectsQuery = await makeRequestOne({
        url: URLS.PROJECTS,
        method: "GET",
        params: {
            limit: 100,
            fields: 'id,created_by,full_name,name,code,created_on'
        },
        extra_headers: {
            authorization: `Bearer ${token}`
        },
        useNext: true
    })

    const checkersQuery = await makeRequestOne({
        url: URLS.USERS,
        method: "GET",
        params: {
            limit: 100,
            fields: 'id,full_name',
            profile__checker: true
        },
        extra_headers: {
            authorization: `Bearer ${token}`
        },
        useNext: true
    })

    return {
        props: {
            projects: projectsQuery?.data?.results,
            checkers: checkersQuery?.data?.results,
            user: user ? user.full_name : null
        }
    }
}

CashAdvance.PageLayout = HeaderAndFooterWrapper
export default CashAdvance