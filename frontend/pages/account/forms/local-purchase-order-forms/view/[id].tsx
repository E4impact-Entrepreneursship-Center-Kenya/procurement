import React, { useRef } from 'react'
import HeaderAndFooterWrapper from '../../../../../layouts/HeaderAndFooterWrapper'
import { formatCurrency, makeRequestOne } from '../../../../../config/config'
import { LOCAL_STORAGE_KEYS, URLS } from '../../../../../config/constants'
import requireAuthMiddleware from '../../../../../middleware/requireAuthMiddleware'
import { Box, Button, Container, Progress, Stack, Text, Title } from '@mantine/core'
import { getColor, getTooltip } from '../../../../../config/functions'
import ReactToPrint from 'react-to-print';
import { IconPrinter } from '@tabler/icons'
import Head from 'next/head'
import RenderForm, { RenderInitialAndOtherFields } from '../../../../../components/invoice/render_forms/RenderForm'
import { ApprovalPersonNoInput } from '../../../../../components/invoice/Approvals'
import ApprovalsSection from '../../../../../components/invoice/ApprovalsSection'
import { UpdateApprovalField } from '../../../../../components/invoice/ApprovalsSimplified'

interface ISingleForm {
    form: any
    userId: any
}

const SingleForm = ({ form, userId }: ISingleForm) => {
    console.log(form)
    const color = getColor(form?.level)
    const tip = getTooltip(form?.level)
    const componentRef = useRef(null);
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
                    <RenderForm form_title="Expense Claim Form" form={form} userId={userId} ref={componentRef} initial_fields={[
                        {
                            label: "Project",
                            value: form?.project?.name,
                            grid_size: 3
                        },
                        {
                            label: "Budget Line",
                            value: `${form?.budget_line?.code ?? ""} ${form?.budget_line?.text ?? ""}`,
                            grid_size: 3
                        },
                        {
                            label: "Date",
                            value: form?.date,
                            grid_size: 3
                        },
                        {
                            label: "Delivery Date",
                            value: form?.delivery_date,
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
                            title: 'Details',
                            accessor: 'description',
                            width: "230px",
                        },
                        {
                            title: `Amount (${form.currency?.toUpperCase()})`,
                            accessor: 'amount',
                            width: "100px",
                            render: (item: any) => (
                                <b>{formatCurrency(item?.amount)}</b>
                            )
                        }
                    ]}
                        extra_info_before_table={<>
                            <Title order={3} size={'16px'} weight={500} p={0} mb={0}>Dear</Title>
                            <RenderInitialAndOtherFields fields={[
                                {
                                    label: "Supplier",
                                    value: form?.supplier ?? "",
                                    grid_size: 4
                                },
                                {
                                    label: "Address",
                                    value: form?.address ?? "",
                                    grid_size: 4
                                },
                                {
                                    label: "Mobile",
                                    value: form?.mobile ?? "",
                                    grid_size: 4
                                },
                            ]}
                            />
                            <Text size={'sm'} mt="xs">
                                Please supply the items listed below, according to your quotation.
                            </Text>
                        </>}
                    >
                        <Title order={3} size={'xs'} align='right' weight={500}>Delivery/Transport Costs <b>{form?.currency?.toUpperCase()} {formatCurrency(form.delivery_costs)}</b></Title>
                        
                        <RenderInitialAndOtherFields fields={[
                            {
                                label: "Payment Terms",
                                value: form?.payment_terms ?? "",
                                grid_size: 6
                            },
                            {
                                label: "Delivery Period",
                                value: form?.delivery_period ?? "",
                                grid_size: 6
                            },
                            {
                                label: "Price Validity Period",
                                value: form?.price_validity_period ?? "",
                                grid_size: 6
                            },
                            {
                                label: "Warranty Period",
                                value: form?.warrant_period ?? "",
                                grid_size: 6
                            },
                        ]}
                        />
                        <ApprovalsSection>
                            <ApprovalPersonNoInput title="Requested By" person={form?.requested_by} />
                            {/* {JSON.stringify(form, null, 4)} */}
                            <UpdateApprovalField
                                formID={form.id}
                                inputLabel={'Approved By'}
                                field_prefix={'approved_by'}
                                field_name={'approved_by'}
                                active={form?.project?.manager?.id === parseInt(userId)}
                                field_update_url={`${URLS.FORM_USERS}`}
                                formName={'local-purchase-order'}
                                data={form.approved_by}
                                currency={form.currency} />

                        </ApprovalsSection>
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
            url: `${URLS.LOCAL_PURCHASE_ORDER_FORMS}/${params?.id}`,
            method: "GET",
            extra_headers: {
                authorization: `Bearer ${token}`
            },
            params: {
                // fields: "id,country,currency,requested_by,full_name,checker,user,signature,date,amount,receipt,checked_by,approver,approved_by,amount_received,name,level,invoice_number,bank_batch_no,purpose,project,code,name,activity_end_date,expected_liquidation_date,items,total,is_completed"
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