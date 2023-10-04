import React from 'react'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import { formatCurrency, getTheme, makeRequestOne } from '../../config/config'
import { APP_NAME, FOUNDATION_LOGO, INVOICE_LEVELS, LOCAL_STORAGE_KEYS, SEPARATOR, URLS, WEBSITE_LOGO } from '../../config/constants'
import customRedirect from '../../middleware/redirectIfNoAuth'
import requireAuthMiddleware from '../../middleware/requireAuthMiddleware'
import { Container, Paper, Stack, Group, Title, Box, ActionIcon, Button, NumberInput, TextInput, Radio, Image } from '@mantine/core'
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
import PurchaseRequisitionFields from '../../components/invoice/initial_fields/PurchaseRequisitionFields'

const SINGLE_ITEM = {
    no: '',
    description: '',
    qty: '',
    unit_price: '',
    amount: '',
}


const PurchaseRequisitionDatatable = ({ form }: { form: any }) => {

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
                minHeight={120}
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
                        title: 'Item/Service Description/Specification',
                        accessor: 'description',
                        width: "250px",
                        render: (entry: any, i: any) => {
                            return <TextInput {...form.getInputProps(`items.${i}.description`)} placeholder="Give a description of this item" />
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
                        title: 'Estimated Budget Amount (KSH)',
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

interface IProps {
    projects: any
    checkers: any
    user: any
}

const PurchaseRequisitionForm = ({ projects, checkers, user }: IProps) => {

    const form = useForm({
        initialValues: {
            country: "",
            currency: "",
            invoice_number: "",
            requisition_date: "",
            date_required: "",
            project: "",
            deliver_to: "",
            items: Array(1).fill(SINGLE_ITEM),
            budget_availability: '',

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
                <title>{`${APP_NAME} ${SEPARATOR} Purchase Requisition Form`}</title>
            </Head>
            {/* <CustomHeading title="Request For Quotation Form" /> */}
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
                            <InvoiceHeader title={`PURCHASE REQUISITION FORM  (${form.values?.currency?.toUpperCase()})`} form={form} />
                            <PurchaseRequisitionFields form={form} projects={projects} />
                            
                            <PurchaseRequisitionDatatable form={form} />
                            <Group position="right">
                                <Title order={3} weight={600}>Total</Title>
                                <Title order={3} weight={600}>
                                    {`KSH ${formatCurrency(getAmountTotal())}`}
                                </Title>
                            </Group>
                            <ApprovalsSection>
                                <ApprovalPerson person={'Requested By'} form={form} field_prefix={'requested_by'} field_name={'user'} active={true} level={INVOICE_LEVELS.LEVEL_1} />
                                <ApprovalPerson person={'Approved By'} form={form} field_prefix={'approved_by'} field_name={'user'} active={false} level={INVOICE_LEVELS.LEVEL_1} />
                                
                            </ApprovalsSection>
                            <Box>
                                <Title order={3} mb="md">For IT use only</Title>
                                <ApprovalPerson person={'Verified By'} form={form} field_prefix={'verified_by'} field_name={'user'} active={false} level={INVOICE_LEVELS.LEVEL_1} />
                            </Box>
                            <Box>
                                <Title order={3}>For Finance use only</Title>
                                <Radio.Group
                                    label="Budget Availability"
                                    withAsterisk
                                    {...form.getInputProps('budget_availability')}
                                >
                                    <Group mt="xs">
                                        <Radio value="no" label="No" />
                                        <Radio value="yes" label="Yes" />
                                    </Group>
                                </Radio.Group>
                            </Box>
                            <Box>
                                <ApprovalPerson person={'Confirmed By'} form={form} field_prefix={'confirmed_by'} field_name={'user'} active={false} level={INVOICE_LEVELS.LEVEL_1} />
                            </Box>
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

PurchaseRequisitionForm.PageLayout = HeaderAndFooterWrapper
export default PurchaseRequisitionForm