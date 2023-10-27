import React, { useRef } from 'react'
import HeaderAndFooterWrapper from '../../../../../layouts/HeaderAndFooterWrapper'
import { formatCurrency, makeRequestOne, toDate } from '../../../../../config/config'
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

const SingleOverExpenditureForm = ({ form, userId }: ISingleForm) => {
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
                    <RenderForm hideTotal={false} form_title="Expense Claim Form" form={form} userId={userId} ref={componentRef} initial_fields={[
                        {
                            label: "Payee",
                            value: form?.payee,
                            grid_size: 6
                        },
                        {
                            label: "Date",
                            value: form?.date,
                            grid_size: 6
                        }
                    ]} table_columns={[
                        {
                            accessor: 'no',
                            title: "No.",
                            width: "60px",
                            noWrap: true,
                            render: (entry: any, i: number) => (
                                <Box>
                                    {
                                        entry ? (
                                            <Text>
                                                {i + 1}
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
                            accessor: 'date',
                            title: "Date of Activity",
                            width: "150px",
                            noWrap: true,
                            render: (entry: any) => (
                                <Text size={'sm'}>{toDate(entry?.date)}</Text>
                            )
                        },
                        {
                            title: 'Description',
                            accessor: 'description',
                            width: "250px",
                        },
                        {
                            title: 'Amount Spent',
                            accessor: 'amt_spent',
                            width: "100px",
                            render: (entry: any, i: any) => {
                                return <Text size={'sm'}><b>{`${form?.currency?.toUpperCase()} ${formatCurrency(entry?.amt_spent)}`}</b></Text>
                            }
                        },
                        {
                            title: 'Project',
                            accessor: 'project.name',
                            width: "130px",
                            render: (entry: any, i: any) => {
                                return <>
                                    <Text size={'sm'}>{entry?.project?.name}</Text>
                                    <Text size={'xs'}>{entry?.project?.code}</Text>
                                </>
                            }
                        },
                    ]} extra_info_before_table={<>
                        <Title order={3} weight={500} size={'16px'}>Amount Received</Title>
                        <RenderInitialAndOtherFields fields={[
                            {
                                label: "Date of Receipt",
                                value: form?.date_of_receipt ?? "",
                                grid_size: 2
                            },
                            {
                                label: "Description",
                                value: form?.amt_received_description ?? "",
                                grid_size: 4
                            },
                            {
                                label: "Amount Spent",
                                value: `${form?.currency?.toUpperCase()} ${formatCurrency(form?.amt_spent)}`,
                                grid_size: 3
                            },
                            {
                                label: "Project",
                                value: `${form?.project?.name ?? ""} - ${form?.project?.code ?? ""} ` ?? "",
                                grid_size: 3
                            },
                        ]}
                        />
                    </>}>
                        <Title order={3} weight={500} size={'16px'}>Reason</Title>
                        <Text size={'sm'}>
                            {form?.reason ?? ""}
                        </Text>
                        <Title order={3} weight={500} size={'16px'}>Deposit Details</Title>
                        <RenderInitialAndOtherFields fields={[
                            {
                                label: "ACCOUNT NUMBER",
                                value: form?.account_number ?? "",
                                grid_size: 4
                            },
                            {
                                label: "AMOUNT DEPOSITED",
                                value: form?.amount_deposited ?? "",
                                grid_size: 4
                            },
                            {
                                label: "MPESA CODE",
                                value: form?.mpesa_code ?? "",
                                grid_size: 4
                            },
                            {
                                label: "REFERENCE ID",
                                value: form?.ref_id ?? "",
                                grid_size: 4
                            },
                            {
                                label: "DATE",
                                value: form?.date ?? "",
                                grid_size: 2
                            },
                            {
                                label: "Time",
                                value: form?.time ?? "",
                                grid_size: 2
                            },
                        ]} />
                        <ApprovalsSection>
                            <ApprovalPersonNoInput title="Requested By" person={form?.requested_by} />

                            <UpdateApprovalField
                                formID={form.id}
                                inputLabel="Checked By"
                                field_prefix={'checked_by'}
                                field_name={'checked_by'}
                                active={form?.checker?.id === parseInt(userId)}
                                field_update_url={`${URLS.FORM_USERS}`}
                                formName={'under-expenditure'}
                                data={form.checked_by}
                                currency={form.currency} />

                            <UpdateApprovalField
                                formID={form.id}
                                inputLabel={'Approved By'}
                                field_prefix={'approved_by'}
                                field_name={'approved_by'}
                                active={form?.project?.manager?.id === parseInt(userId)}
                                field_update_url={`${URLS.FORM_USERS}`}
                                formName={'under-expenditure'}
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
            url: `${URLS.UNDER_EXPENDITURE_FORMS}/${params?.id}`,
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

SingleOverExpenditureForm.PageLayout = HeaderAndFooterWrapper
export default SingleOverExpenditureForm