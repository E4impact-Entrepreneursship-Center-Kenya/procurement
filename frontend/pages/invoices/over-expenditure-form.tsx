import React from 'react'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import { formatCurrency, getTheme, makeRequestOne } from '../../config/config'
import { APP_NAME, FOUNDATION_LOGO, INVOICE_LEVELS, LOCAL_STORAGE_KEYS, SEPARATOR, URLS, WEBSITE_LOGO } from '../../config/constants'
import customRedirect from '../../middleware/redirectIfNoAuth'
import requireAuthMiddleware from '../../middleware/requireAuthMiddleware'
import { Container, Paper, Stack, Group, Title, Box, Select, ActionIcon, Button, NumberInput, TextInput, Overlay, Radio, Grid, Text, Textarea, Image } from '@mantine/core'
import ApprovalPerson from '../../components/invoice/Approvals'
import ApprovalsSection from '../../components/invoice/ApprovalsSection'
import InvoiceFooter from '../../components/invoice/InvoiceFooter'
import InvoiceHeader from '../../components/invoice/InvoiceHeader'
import InvoiceTitle from '../../components/invoice/InvoiceTitle'
import projects from '../admin/projects'
import Head from 'next/head'
import { useForm } from '@mantine/form'
import FormTitle from '../../components/invoice/FormTitle'
import { IconTrash, IconPlus } from '@tabler/icons'
import { DataTable } from 'mantine-datatable'
import OverExpenditureFormFields from '../../components/invoice/initial_fields/OverExpenditureFormFields'
import { DateInput } from '@mantine/dates'

const SINGLE_ITEM = {
    date: '',
    description: '',
    amt_spent: '',
    project: '',
    project_code: '',
}


const OverExpenditureFormDatatableAmtReceived = ({ form }: { form: any }) => {

    function addItem() {
        form.insertListItem('items', SINGLE_ITEM)
    }

    function removeItem(index: number) {
        form.removeListItem('items', index)
    }

    return (
        <div>
            <Title order={4}>Amount Received</Title>
            <DataTable
                style={{
                    overflowY: "auto"
                }}
                horizontalSpacing="xs"
                verticalSpacing="md"
                minHeight={100}
                records={[null]}
                columns={[
                    {
                        accessor: 'date',
                        title: "Date of Receipt",
                        width: "150px",
                        noWrap: true,
                        render: (entry: any, i: any) => {
                            return <TextInput hideControls={true} {...form.getInputProps(`date_of_receipt`)} placeholder='2023-08-23' />
                        }
                    },
                    {
                        title: 'Description',
                        accessor: 'description',
                        width: "250px",
                        render: (entry: any, i: any) => {
                            return <TextInput {...form.getInputProps(`amt_received_description`)} placeholder="Give more Details" />
                        }
                    },
                    {
                        title: 'Amount Spent',
                        accessor: 'amt_spent',
                        width: "100px",
                        render: (entry: any, i: any) => {
                            return <NumberInput hideControls  {...form.getInputProps(`amt_received`)} placeholder="Amount Received" />
                        }
                    },
                    {
                        title: 'Project',
                        accessor: 'project',
                        width: "130px",
                        render: (entry: any, i: any) => {
                            return <Select data={[]}  {...form.getInputProps(`project`)} placeholder='Project' />
                        }
                    },
                    {
                        title: 'Project Code',
                        accessor: 'project_code',
                        width: "100px",
                        render: (entry: any, i: any) => {
                            return <TextInput
                                disabled
                                {...form.getInputProps(`project_code`)}
                            />
                        }
                    },
                ]}
            />
        </div>
    )
}


const OverExpenditureFormDatatable = ({ form }: { form: any }) => {

    function addItem() {
        form.insertListItem('items', SINGLE_ITEM)
    }

    function removeItem(index: number) {
        form.removeListItem('items', index)
    }

    return (
        <div>
            <Title order={4}>Cost Breakdown</Title>
            <DataTable
                horizontalSpacing="xs"
                verticalSpacing="md"
                minHeight={400}
                records={form.values.items}
                columns={[
                    {
                        accessor: 'date',
                        title: "Date of Activity",
                        width: "150px",
                        noWrap: true,
                        render: (entry: any, i: any) => {
                            return <DateInput hideControls={true} {...form.getInputProps(`items.${i}.date`)} placeholder='Date' />
                        }
                    },
                    {
                        title: 'Description',
                        accessor: 'description',
                        width: "250px",
                        render: (entry: any, i: any) => {
                            return <TextInput {...form.getInputProps(`items.${i}.description`)} placeholder="Give more Details" />
                        }
                    },
                    {
                        title: 'Amount Spent',
                        accessor: 'amt_spent',
                        width: "100px",
                        render: (entry: any, i: any) => {
                            return <NumberInput hideControls  {...form.getInputProps(`items.${i}.amt_spent`)} placeholder="Amt Spent" />
                        }
                    },
                    {
                        title: 'Project',
                        accessor: 'project',
                        width: "130px",
                        render: (entry: any, i: any) => {
                            return <Select data={[]}  {...form.getInputProps(`items.${i}.project`)} placeholder='Project' />
                        }
                    },
                    {
                        title: 'Project Code',
                        accessor: 'project_code',
                        width: "100px",
                        render: (entry: any, i: any) => {
                            return <TextInput
                                disabled
                                {...form.getInputProps(`items.${i}.project_code`)}
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
        </div>
    )
}


interface IProps {
    projects: any
    checkers: any
    user: any
}

const OverExpenditureForm = ({ projects, checkers, user }: IProps) => {

    const form = useForm({
        initialValues: {
            country: "",
            currency: "",
            invoice_number: "",
            bank_batch_no: "",
            date_of_receipt: "",
            amt_received_description: "",
            amt_received: "",
            project: "",
            project_code: "",
            items: Array(2).fill(SINGLE_ITEM),
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

    return (
        <div>
            <Head>
                <title>{`${APP_NAME} ${SEPARATOR} Over Expenditure Form`}</title>
            </Head>
            <Container size="lg" mt={20} my="lg">
                <Paper py={30} px={30} radius="md" sx={theme => ({
                    background: getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0]
                })}>
                    <form>
                        <Stack spacing={20}>
                            {
                                form.values.country?.toLowerCase() === 'kenya' ?
                                    <Image mx="auto" src={WEBSITE_LOGO} width={250} alt='E4I Invoice' />
                                    :
                                    <Image mx="auto" src={FOUNDATION_LOGO} width={250} alt='E4I Invoice' />
                            }
                            <InvoiceHeader title={`OVER EXPENDITURE FORM (${form.values?.currency?.toUpperCase()})`} form={form} />

                            <OverExpenditureFormFields form={form} />
                            <OverExpenditureFormDatatableAmtReceived form={form} />
                            <OverExpenditureFormDatatable form={form} />
                            <Group position="right">
                                <Title order={3} weight={600}>Total Amount OverSpent</Title>
                                <Title order={3} weight={600}>
                                    {`KSH ${formatCurrency(getAmountTotal())}`}
                                </Title>
                            </Group>
                            <Textarea label="Reason" minRows={2} placeholder='Reason' {...form.getInputProps('reason')} />
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
                            </ApprovalsSection>
                            <InvoiceFooter />
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

OverExpenditureForm.PageLayout = HeaderAndFooterWrapper
export default OverExpenditureForm