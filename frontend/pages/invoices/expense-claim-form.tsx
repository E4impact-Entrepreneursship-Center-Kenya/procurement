import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { APP_NAME, FOUNDATION_LOGO, INVOICE_LEVELS, LOCAL_STORAGE_KEYS, SEPARATOR, URLS, WEBSITE_LOGO } from '../../config/constants'
import { ActionIcon, Box, Button, Card, Container, Group, Image, NumberInput, Paper, Select, Stack, TextInput, Textarea, Title } from '@mantine/core'
import CustomHeading from '../../components/navigations/CustomHeading'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import InvoiceFooter from '../../components/invoice/InvoiceFooter'
import InvoiceHeader from '../../components/invoice/InvoiceHeader'
import { formatCurrency, getTheme, makeRequestOne } from '../../config/config'
import InvoiceTitle from '../../components/invoice/InvoiceTitle'
import ExpenseClaimFields from '../../components/invoice/initial_fields/ExpenseClaimFields'
import { useForm } from '@mantine/form'
import { IconTrash, IconPlus } from '@tabler/icons'
import { DataTable } from 'mantine-datatable'
import budgetLines from '../api/accounting/budget-lines'
import { Prism } from '@mantine/prism'
import { useAppContext } from '../../providers/appProvider'
import customRedirect from '../../middleware/redirectIfNoAuth'
import requireAuthMiddleware from '../../middleware/requireAuthMiddleware'
import ApprovalsSection from '../../components/invoice/ApprovalsSection'
import ApprovalPerson from '../../components/invoice/Approvals'
import FormTitle from '../../components/invoice/FormTitle'

const SINGLE_ITEM = {
    no: '',
    description: '',
    amount: '',
}


const ExpenseClaimDatatable = ({ form }: { form: any }) => {

    function addItem() {
        form.insertListItem('items', SINGLE_ITEM)
    }

    function removeItem(index: number) {
        form.removeListItem('items', index)
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
                        title: 'EXPENSES INCURED DURING THE PERIOD',
                        accessor: 'description',
                        width: "250px",
                        render: (entry: any, i: any) => {
                            return <TextInput {...form.getInputProps(`items.${i}.description`)} placeholder="Give a description of this item" />
                        }
                    },
                    {
                        title: `AMOUNT (${form?.values?.currency?.toUpperCase()})`,
                        accessor: 'amount',
                        width: "100px",
                        render: (entry: any, i: any) => {
                            return <NumberInput
                                icon={`${form?.values?.currency?.toUpperCase()}`}
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

interface IProps {
    projects: any
    checkers: any
    user: any
}

const ExpenseClaim = ({ projects, checkers, user }: IProps) => {

    const [budgetLines, setBudgetLines] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { user_id, token } = useAppContext()

    const form = useForm({
        initialValues: {
            country: "Kenya",
            currency: "kes",
            project: '',
            budget_line: '',
            invoice_number: "",
            bank_batch_no: "",
            purpose: '',
            name: '',
            reason: '',
            cash_advance_received: '',
            items: Array(1).fill(SINGLE_ITEM),
            requested_by: {
                user: user,
                signature: "",
                date: "",
            },
            checker: "",
        }
    })

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
                fields: 'id,code,created_on',
                limit: 150
            }
        }).then((res: any) => {
            setBudgetLines(res?.data?.results)
        }).catch(() => { })
    }

    useEffect(() => {
        loadBudgetLines()
    }, [form.values.project])

    return (
        <div>
            <Head>
                <title>{`${APP_NAME} ${SEPARATOR} Expense Claim Form`}</title>
            </Head>
            {/* <CustomHeading title="Claim Form" /> */}
            <Container size="lg" mt={20} my="lg">
                <Paper py={30} px={30} radius="md" sx={theme => ({
                    background: getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0]
                })}>
                    <form>
                        <Stack spacing={20}>
                            {/* <FormTitle title='Expense Claim Form' />
                            <InvoiceHeader />
                            <InvoiceTitle title='EXPENSE CLAIM FORM (KSHS)' /> */}

                            {
                                form.values.country?.toLowerCase() === 'kenya' ?
                                    <Image mx="auto" src={WEBSITE_LOGO} width={250} alt='E4I Invoice' />
                                    :
                                    <Image mx="auto" src={FOUNDATION_LOGO} width={250} alt='E4I Invoice' />
                            }
                            <InvoiceHeader title={`EXPENSE CLAIM FORM  (${form.values?.currency?.toUpperCase()})`} form={form} />

                            <ExpenseClaimFields form={form} projects={projects} budgetLines={budgetLines} resetBudgetLines={() => setBudgetLines([])} />
                            <ExpenseClaimDatatable form={form} />

                            <Textarea {...form.getInputProps('reason')} label="Balance (Overspend/Underspend) Reason" placeholder='Enter Reason' />
                            <Group position="right">
                                <Title order={3} weight={600}>Total</Title>
                                <Title order={3} weight={600}>
                                    {`${form?.values?.currency} ${formatCurrency(getAmountTotal())}`}
                                </Title>
                            </Group>
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


ExpenseClaim.PageLayout = HeaderAndFooterWrapper
export default ExpenseClaim