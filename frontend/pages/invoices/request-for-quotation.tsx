import React, { useState } from 'react'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import { convertJSONToFormData, formatCurrency, formatDateToYYYYMMDD, getTheme, makeRequestOne } from '../../config/config'
import { APP_NAME, EMOJIS, FOUNDATION_LOGO, INVOICE_LEVELS, LOCAL_STORAGE_KEYS, SEPARATOR, URLS, WEBSITE_LOGO } from '../../config/constants'
import customRedirect from '../../middleware/redirectIfNoAuth'
import requireAuthMiddleware from '../../middleware/requireAuthMiddleware'
import { Container, Paper, Stack, Group, Title, ActionIcon, Button, NumberInput, TextInput, Grid, Image, LoadingOverlay } from '@mantine/core'
import ApprovalPerson from '../../components/invoice/Approvals'
import ApprovalsSection from '../../components/invoice/ApprovalsSection'
import InvoiceFooter from '../../components/invoice/InvoiceFooter'
import InvoiceHeader from '../../components/invoice/InvoiceHeader'
import projects from '../admin/projects'
import Head from 'next/head'
import { useForm } from '@mantine/form'
import { IconTrash, IconPlus, IconExclamationMark, IconInfoCircle } from '@tabler/icons'
import { DataTable } from 'mantine-datatable'
import RequestForQuotationFields from '../../components/invoice/initial_fields/RequestForQuotationFields'
import { showNotification } from '@mantine/notifications'
import { displayErrors } from '../../config/functions'
import { useAppContext } from '../../providers/appProvider'

const SINGLE_ITEM = {
    no: '',
    description: '',
    qty: '',
    unit: '',
    unit_price: '',
    amount: '',
}


const RequestForQuotationDatatable = ({ form }: { form: any }) => {

    function addItem() {
        form.insertListItem('items', SINGLE_ITEM)
    }

    function removeItem(index: number) {
        form.removeListItem('items', index)
    }

    const getTotal = (units: any, rate: any, index: number) => {
        if (units && units !== "" && rate && rate !== "") {
            const amt = parseFloat(units) * parseFloat(rate)
            form.setFieldValue(`items.${index}.amount`, amt)
        }
    }

    return (
        <>
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
                        title: 'Item Description',
                        accessor: 'description',
                        width: "250px",
                        render: (entry: any, i: any) => {
                            return <TextInput {...form.getInputProps(`items.${i}.description`)} placeholder="Give a description of this item" />
                        }
                    },
                    {
                        title: 'Unit',
                        accessor: 'unit',
                        width: "60px",
                        render: (entry: any, i: any) => {
                            return <TextInput  {...form.getInputProps(`items.${i}.unit`)} placeholder="KG, PC, LTR" />
                        }
                    },
                    {
                        title: 'Quantity',
                        accessor: 'qty',
                        width: "80px",
                        render: (entry: any, i: any) => {
                            return <NumberInput hideControls={true}  {...form.getInputProps(`items.${i}.qty`)} placeholder='20' onBlur={el => getTotal(form.values.items[i].qty, form.values.items[i].unit_price, i)} />
                        }
                    },
                    {
                        title: 'Unit Price',
                        accessor: 'unit_price',
                        width: "60px",
                        ellipsis: false,
                        // noWrap: false,
                        render: (entry: any, i: any) => {
                            return <NumberInput hideControls={true}  {...form.getInputProps(`items.${i}.unit_price`)} placeholder='20' onBlur={el => getTotal(form.values.items[i].qty, form.values.items[i].unit_price, i)} />
                        }
                    },
                    {
                        title: 'Total Cost (KSH)',
                        accessor: 'amount',
                        width: "100px",
                        render: (entry: any, i: any) => {
                            return <NumberInput
                                disabled
                                icon={'KSH'}
                                thousandsSeparator=','
                                hideControls
                                {...form.getInputProps(`items.${i}.amount`)}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
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

            <Group position="right" mt="md">
                <Button radius="md" leftIcon={<IconPlus />} onClick={addItem}>Add Item</Button>
            </Group>
        </>
    )
}

const ExtraFields = ({ form }: { form: any }) => {

    return (
        <Grid>
            <Grid.Col md={6}>
                <TextInput label="Payment Terms" placeholder='Payment Terms' {...form.getInputProps('payment_terms')} />
            </Grid.Col>
            <Grid.Col md={6}>
                <TextInput label="Delivery period" placeholder='Duration for delivery of items'  {...form.getInputProps('delivery_period')} />
            </Grid.Col>
            <Grid.Col md={6}>
                <TextInput label="Price validity period" placeholder='Price validity period'  {...form.getInputProps('price_validity_period')} />
            </Grid.Col>
            <Grid.Col md={6}>
                <TextInput label="Warranty period" placeholder='Where applicable' {...form.getInputProps('warrant_period')} />
            </Grid.Col>
        </Grid>
    )
}

interface IProps {
    projects: any
    checkers: any
    user: any
}

const RequestForQuotation = ({ projects, checkers, user }: IProps) => {
    const [loading, setLoading] = useState(false)
    const { user_id, token } = useAppContext()

    const form = useForm({
        initialValues: {
            country: "",
            currency: "",
            invoice_number: "",
            bank_batch_no: "",
            vendor_name: "",
            address: "",
            phone_number: "",
            items: Array(1).fill(SINGLE_ITEM),
            payment_terms: "",
            delivery_period: "",
            price_validity_period: "",
            warrant_period: "",
            requested_by: {
                user: "",
                signature: "",
                date: ""
            },
        }
    })

    function getAmountTotal(items?: any) {
        if (items) {
            return items?.reduce((old: number, item: any, i: number) => (item?.amount !== "" || item?.amount !== null) ? old + item?.amount : old, 0)
        }
        return form.values?.items?.reduce((old: number, item: any, i: number) => (item?.amount !== "" || item?.amount !== null) ? old + item?.amount : old, 0)
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

        let requested_by_date = formatDateToYYYYMMDD(data.requested_by.date)
        data.requested_by.date = requested_by_date

        const formData = convertJSONToFormData(data)
        makeRequestOne({
            url: URLS.REQUEST_FOR_QUOTATION_FORMS,
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

    return (
        <div>
            <Head>
                <title>{`${APP_NAME} ${SEPARATOR} Request For Quotation Form`}</title>
            </Head>
            {/* <CustomHeading title="Request For Quotation Form" /> */}
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
                            <InvoiceHeader title={`REQUEST FOR QUOTATION FORM (${form.values?.currency?.toUpperCase()})`} form={form} />

                            <RequestForQuotationFields form={form} projects={projects} />
                            <RequestForQuotationDatatable form={form} />
                            <Group position="right">
                                <Title order={3} weight={600}>Total</Title>
                                <Title order={3} weight={600}>
                                    {`KSH ${formatCurrency(getAmountTotal())}`}
                                </Title>
                            </Group>
                            <ExtraFields form={form} />
                            <ApprovalsSection>
                                <ApprovalPerson person={'Requested By'} form={form} field_prefix={'requested_by'} field_name={'user'} active={true} level={INVOICE_LEVELS.LEVEL_1} />
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

    const projectsQuery = makeRequestOne({
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

    const checkersQuery = makeRequestOne({
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

    return Promise.allSettled([projectsQuery, checkersQuery]).then((res) => {
        const projects: any = res[0]
        const checkers: any = res[1]

        if (projects?.status === 'rejected') {
            customRedirect(context.req, context.res)
        }
        return {
            props: {
                projects: projects?.value?.data?.results,
                checkers: checkers?.value?.data?.results,
                user: user ? user.full_name : null
            }
        }
    })
}

RequestForQuotation.PageLayout = HeaderAndFooterWrapper
export default RequestForQuotation