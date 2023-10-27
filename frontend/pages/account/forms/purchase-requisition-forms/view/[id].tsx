import React, { useEffect, useRef, useState } from 'react'
import HeaderAndFooterWrapper from '../../../../../layouts/HeaderAndFooterWrapper'
import { formatCurrency, makeRequestOne } from '../../../../../config/config'
import { LOCAL_STORAGE_KEYS, URLS } from '../../../../../config/constants'
import requireAuthMiddleware from '../../../../../middleware/requireAuthMiddleware'
import { Box, Button, Container, Progress, Stack, Text, Title } from '@mantine/core'
import { getColor, getTooltip } from '../../../../../config/functions'
import ReactToPrint from 'react-to-print';
import { IconPrinter } from '@tabler/icons'
import Head from 'next/head'
import RenderForm from '../../../../../components/invoice/render_forms/RenderForm'
import { ApprovalPersonNoInput } from '../../../../../components/invoice/Approvals'
import ApprovalsSection from '../../../../../components/invoice/ApprovalsSection'
import { UpdateApprovalField, UpdateSingleFormField } from '../../../../../components/invoice/ApprovalsSimplified'
import { useAppContext } from '../../../../../providers/appProvider'

interface ISingleForm {
    form: any
    userId: any
}

const SingleForm = ({ form, userId }: ISingleForm) => {

    const [user_, setUser] = useState<any>(null)
    const { user } = useAppContext()

    const color = getColor(form?.level)
    const tip = getTooltip(form?.level)
    const componentRef = useRef(null);


    useEffect(() => {
        const u = JSON.parse(user ?? "null")
        console.log(u)
        setUser(u)
    }, [])

    return (
        <div>
            <Head>
                <title>{`Cash Advance Form ${form?.invoice_number}`}</title>
            </Head>
            <Container py={40} size="lg">
                <Stack>
                    <Progress size="xl" striped animate={form?.level !== 4} sections={[
                        { value: form?.level * 25, color: color, label: `Progress ${form?.level * 25}%`, tooltip: tip }]} />
                    {/* <RenderExpenseClaimForm form={form} userId={userId} ref={componentRef} /> */}
                    <RenderForm form_title="Expense Claim Form" form={form} userId={userId} ref={componentRef}
                        initial_fields={[
                            {
                                label: "Requisition Date",
                                value: form?.requisition_date,
                                grid_size: 3
                            },
                            {
                                label: "Items Required By When",
                                value: form?.date_required,
                                grid_size: 3
                            },
                            {
                                label: "Project",
                                value: `${form?.project?.name ?? ""}`,
                                grid_size: 3
                            },
                            {
                                label: "Delivered To",
                                value: `${form?.delivered_to}`,
                                grid_size: 3
                            },
                        ]} table_columns={[
                            {
                                accessor: 'no',
                                title: "No.",
                                width: "60px",
                                noWrap: true,
                                render: (entry: any) => (
                                    <Box>
                                        {
                                            entry ? (
                                                <Text>
                                                    {entry?.no}
                                                </Text>
                                            ) : (
                                                <Box style={{
                                                    height: "16px"
                                                }}>
                                                    {/* no entry */}
                                                </Box>
                                            )
                                        }
                                    </Box>
                                )
                            },
                            {
                                title: 'Item/Service Description/Specification',
                                accessor: 'description',
                                width: "230px",
                            },
                            {
                                title: 'Quantity',
                                accessor: 'qty',
                                width: "80px",
                            },
                            {
                                title: 'Unit Price',
                                accessor: 'unit_price',
                                width: "60px",
                            },
                            {
                                title: `Amount (${form.currency?.toUpperCase()})`,
                                accessor: 'amount',
                                width: "100px",
                                render: (item: any) => (
                                    <b>{formatCurrency(item?.amount)}</b>
                                )
                            }
                        ]}>
                        <ApprovalsSection>
                            <ApprovalPersonNoInput title="Requested By" person={form?.requested_by} />
                            {/* {JSON.stringify(form, null, 4)} */}
                            <UpdateApprovalField
                                formID={form.id}
                                inputLabel={'Approved By'}
                                field_prefix={'approved_by'}
                                field_name={'approved_by'}
                                active={form.approver.id === parseInt(userId)}
                                field_update_url={`${URLS.FORM_USERS}`}
                                formName={'purchase-requisition'}
                                data={form.approved_by}
                                currency={form.currency} />
                            <Box>
                                <Title order={3} mb={0} weight={500} size={16}>For IT use only</Title>
                                <UpdateApprovalField
                                    formID={form.id}
                                    inputLabel={'Verified By'}
                                    field_prefix={'verified_by'}
                                    field_name={'verified_by'}
                                    active={user_?.profile?.can_verify_purchases}
                                    field_update_url={`${URLS.FORM_USERS}`}
                                    formName={'purchase-requisition'}
                                    data={form.verified_by}
                                    currency={form.currency} />
                            </Box>

                            <Box>
                                <Title order={3} mb={0} weight={500} size={16}>For Finance use only</Title>
                                {
                                    user_?.profile?.is_finance_officer && !form.confirmed_by ? (
                                        <UpdateSingleFormField
                                            field_type={'switch'}
                                            col_size={4}
                                            field_name={'budget_availability'}
                                            field_value={form.budget_availability}
                                            label={'Budget Availability'}
                                            form_update_url={`${URLS.PURCHASE_REQUISITION_FORMS}/${form.id}`}
                                            choices={[
                                                { value: false, label: 'No' },
                                                { value: true, label: 'Yes' },
                                            ]} />
                                    ) : (
                                        <>
                                            <Text>Budget availabilty? {form.budget_availability ? 'Yes' : 'No'}</Text>
                                        </>
                                    )
                                }
                                <UpdateApprovalField
                                    formID={form.id}
                                    inputLabel={'Confirmed By'}
                                    field_prefix={'confirmed_by'}
                                    field_name={'confirmed_by'}
                                    active={user_?.profile?.is_finance_officer}
                                    field_update_url={`${URLS.FORM_USERS}`}
                                    formName={'purchase-requisition'}
                                    data={form.confirmed_by}
                                    currency={form.currency} />
                            </Box>

                        </ApprovalsSection>
                        {
                            user_?.profile?.is_finance_officer && !form.bank_batch_no ? (
                                <UpdateSingleFormField
                                    field_type={'text'}
                                    col_size={4}
                                    field_name={'bank_batch_no'}
                                    field_value={form.bank_batch_no}
                                    label={'Bank Batch No.'}
                                    form_update_url={`${URLS.PURCHASE_REQUISITION_FORMS}/${form.id}`}/>
                            ) : (
                               null
                            )
                        }
                    </RenderForm>

                    <ReactToPrint
                        trigger={() => <Button size="lg" radius="md" variant='filled' mb="md" leftIcon={<IconPrinter />}>Print/Download</Button>}
                        content={() => componentRef?.current}
                    />
                </Stack>
            </Container>
        </div>
    )
}





export const getServerSideProps = async (context: any) => {
    try {
        requireAuthMiddleware(context.req, context.res, () => { })
        const { params } = context
        const cookies = context.req.cookies
        // const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.user]
        const token = cookies[LOCAL_STORAGE_KEYS.token]
        const user_id = cookies[LOCAL_STORAGE_KEYS.user_id]

        const formQuery = await makeRequestOne({
            url: `${URLS.PURCHASE_REQUISITION_FORMS}/${params?.id}`,
            method: "GET",
            extra_headers: {
                authorization: `Bearer ${token}`
            },
            params: {
                fields: "id,country,currency,requested_by,verified_by,full_name,user,signature,date,amount,receipt,approver,approved_by,delivered_to,date_required,requisition_date,level,max_level,invoice_number,bank_batch_no,project,name,budget_availability,verified_by,confirmed_by,items,total,is_completed"
            }
        })

        if (!formQuery?.data) {
            // If the data is not found, return a 404 page
            return {
                notFound: true,
            };
        }

        return {
            props: {
                form: formQuery?.data,
                userId: parseInt(user_id || '0')
            }
        }
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

SingleForm.PageLayout = HeaderAndFooterWrapper
export default SingleForm