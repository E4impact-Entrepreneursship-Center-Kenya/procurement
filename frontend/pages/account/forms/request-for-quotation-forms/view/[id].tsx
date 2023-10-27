import React, { useRef } from 'react'
import HeaderAndFooterWrapper from '../../../../../layouts/HeaderAndFooterWrapper'
import { formatCurrency, makeRequestOne } from '../../../../../config/config'
import { LOCAL_STORAGE_KEYS, URLS } from '../../../../../config/constants'
import requireAuthMiddleware from '../../../../../middleware/requireAuthMiddleware'
import { Button, Container, Progress, Stack } from '@mantine/core'
import { getColor, getTooltip } from '../../../../../config/functions'
import ReactToPrint from 'react-to-print';
import { IconPrinter } from '@tabler/icons'
import Head from 'next/head'
import RenderForm, { RenderInitialAndOtherFields } from '../../../../../components/invoice/render_forms/RenderForm'
import { ApprovalPersonNoInput } from '../../../../../components/invoice/Approvals'
import ApprovalsSection from '../../../../../components/invoice/ApprovalsSection'
import { RequestForQuoatationExtraInfo } from '../../../../../components/invoice/initial_fields/RequestForQuotationFields'

interface ISingleForm {
    form: any
    userId: any
}

const SingleForm = ({ form, userId }: ISingleForm) => {
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
                            label: "Vendor Name",
                            value: form?.vendor_name,
                            grid_size: 3
                        },
                        {
                            label: "Address",
                            value: form?.address,
                            grid_size: 3
                        },
                        {
                            label: "Phone Number",
                            value: form?.phone_number ?? "-",
                            grid_size: 3
                        },
                        {
                            label: "Cash Advance Received",
                            value: `${form?.currency?.toUpperCase()} ${formatCurrency(form?.cash_advance_received)}`,
                            grid_size: 3
                        },
                    ]} 
                    extra_info_before_table={<RequestForQuoatationExtraInfo />}
                    table_columns={[
                        {
                            accessor: 'no',
                            title: "No.",
                            width: "60px",
                            noWrap: true,
                        },
                        {
                            title: 'Item Description',
                            accessor: 'description',
                            width: "250px",
                        },
                        {
                            title: 'Unit',
                            accessor: 'unit',
                            width: "60px",
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
                            ellipsis: false,
                            render: (entry: any, i: any) => {
                                return<>{formatCurrency(entry?.unit_price)}</>
                            }
                        },
                        {
                            title: `Total Cost (${form?.currency?.toUpperCase()})`,
                            accessor: 'amount',
                            width: "100px",
                            render: (entry: any, i: any) => {
                                return<b>{formatCurrency(entry?.amount)}</b>
                            }
                        },
                    ]}>
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
                        ]} />
                        <ApprovalsSection>
                            <ApprovalPersonNoInput title="Requested By" person={form?.requested_by} />
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
            url: `${URLS.REQUEST_FOR_QUOTATION_FORMS}/${params?.id}`,
            method: "GET",
            extra_headers: {
                authorization: `Bearer ${token}`
            },
            params: {
                fields: "id,country,currency,requested_by,full_name,user,signature,date,level,vendor_name,invoice_number,address,phone_number,bank_batch_no,delivery_period,price_validity_period,payment_terms,warrant_period,items,total,is_completed"
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