import React from 'react'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import { formatCurrency, getTheme, makeRequestOne } from '../../config/config'
import { APP_NAME, FOUNDATION_LOGO, INVOICE_LEVELS, LOCAL_STORAGE_KEYS, SEPARATOR, URLS, WEBSITE_LOGO } from '../../config/constants'
import customRedirect from '../../middleware/redirectIfNoAuth'
import requireAuthMiddleware from '../../middleware/requireAuthMiddleware'
import { Container, Paper, Stack, Group, Title, Box, Select, ActionIcon, Button, NumberInput, TextInput, Overlay, Radio, Grid, Text, Image } from '@mantine/core'
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
import LocalPurchaseOrderFields from '../../components/invoice/initial_fields/LocalPurchaseOrderFields'

const SINGLE_ITEM = {
    no: '',
    description: '',
    qty: '',
    currency: '',
    unit_price: '',
    amount: '',
}


const LocalPurchaseOrderDatatable = ({ form }: { form: any }) => {

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
                        title: 'Details',
                        accessor: 'description',
                        width: "250px",
                        render: (entry: any, i: any) => {
                            return <TextInput {...form.getInputProps(`items.${i}.description`)} placeholder="Give a description of this item" />
                        }
                    },
                    {
                        title: 'Currency',
                        accessor: 'currency',
                        width: "60px",
                        render: (entry: any, i: any) => {
                            return <TextInput  {...form.getInputProps(`items.${i}.currency`)} placeholder="KES, $" />
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
                        title: 'Unit Price Including All Applicable Taxes',
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

const LocalPurchaseOrder = ({ projects, checkers, user }: IProps) => {

    const form = useForm({
        initialValues: {
            country: "",
            currency: "",
            invoice_number: "",
            bank_batch_no: "",
            project: "",
            budget_line: "",
            date: "",
            payment_terms: "",
            delivery_date: "",
            supplier: "",
            address: "",
            mobile: "",
            items: Array(1).fill(SINGLE_ITEM),
            requested_by: {
                user: "",
                signature: "",
                date: ""
            },
            delivery_costs: "",
            return_to_name: "",
            return_to_email: ""
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
                <title>{`${APP_NAME} ${SEPARATOR} Local Purchase Order Form`}</title>
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
                            <InvoiceHeader title={`LOCAL PURCHASE ORDER FORM (${form.values?.currency?.toUpperCase()})`} form={form} />

                            <LocalPurchaseOrderFields form={form} projects={projects} />
                            <LocalPurchaseOrderDatatable form={form} />
                            
                            <Grid>
                                <Grid.Col md={9}></Grid.Col>
                                <Grid.Col md={3}>
                                    <TextInput label="Delivery/Transport Costs" {...form.getInputProps('delivery_costs')} />
                                </Grid.Col>
                            </Grid>
                            <Group position="right">
                                <Title order={3} weight={600}>Total</Title>
                                <Title order={3} weight={600}>
                                    {`KSH ${formatCurrency(getAmountTotal())}`}
                                </Title>
                            </Group>
                            <ExtraFields form={form} />
                            <ApprovalsSection>
                                <ApprovalPerson person={'Requested By'} form={form} field_prefix={'requested_by'} field_name={'user'} active={true} level={INVOICE_LEVELS.LEVEL_1} />
                                <ApprovalPerson person={'Approved By'} form={form} field_prefix={'approved_by'} field_name={'user'} active={false} level={INVOICE_LEVELS.LEVEL_1} />
                            </ApprovalsSection>
                            <Box>
                                <Text size="sm">
                                    Please return a signed copy of this purchase order to:
                                </Text>
                                <Grid>
                                    <Grid.Col md={4}>
                                        <TextInput label="Name" placeholder='Name' {...form.getInputProps('return_to_name')} />
                                    </Grid.Col>
                                    <Grid.Col md={4}>
                                        <TextInput label="Email" placeholder='Email' {...form.getInputProps('return_to_email')} />
                                    </Grid.Col>
                                </Grid>
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

LocalPurchaseOrder.PageLayout = HeaderAndFooterWrapper
export default LocalPurchaseOrder