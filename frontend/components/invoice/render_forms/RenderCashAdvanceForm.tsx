import React, { forwardRef, useEffect, useState } from 'react'
import { Stack, Paper, Group, Title, Box, Text, Image } from '@mantine/core'
import { DataTable } from 'mantine-datatable'
import { formatCurrency } from '../../../config/config'
import { ApprovalPersonNoInput } from '../Approvals'
import ApprovalsSection from '../ApprovalsSection'
import InvoiceFooter from '../InvoiceFooter'
import InvoiceHeader from '../InvoiceHeader'
import { InvoiceInitialFieldsCashAdvanceNoInputs } from '../initial_fields/InvoiceInitialFieldsCashAdvance'
import { useForm } from '@mantine/form'
import { useAppContext } from '../../../providers/appProvider'
import UpdateContingencyFields from './UpdateContingencyFields'
import { FOUNDATION_LOGO, WEBSITE_LOGO } from '../../../config/constants'
import UpdateBankBatchNo from '../UpdateBankBatchNo'

interface IRenderCashAdvanceForm {
    form: any
    userId: any
}
const RenderCashAdvanceForm = forwardRef(({ form, userId }: IRenderCashAdvanceForm, ref: any) => {
    const [can_update_batch, setCanUpdateBatch] = useState(false)
    const { user, user_id, token } = useAppContext()

    const updateForm = useForm({
        initialValues: {
            checked_by: {
                user: "",
                signature: "",
                date: ""
            }
        }
    })

    useEffect(() => {
        const user_ = JSON.parse(user || "null")
        updateForm.setFieldValue('checked_by.user', user_?.full_name)
        setCanUpdateBatch(user_?.profile?.can_update_bank_batch)
    }, [user])

    return (
        <Paper ref={ref} px={60} radius="md">
            <Stack spacing={10} pt="md">
                {
                    form.country?.toLowerCase() === 'kenya' ?
                        <Image mx="auto" src={WEBSITE_LOGO} width={250} alt='E4I Invoice' />
                        :
                        <Image mx="auto" src={FOUNDATION_LOGO} width={250} alt='E4I Invoice' />
                }
                <InvoiceHeader form={form} title={`CASH ADVANCE FORM  (${form.currency?.toUpperCase()})`} />
                {
                    (can_update_batch && !form.bank_batch_no && form.level === 4) ? (
                        <UpdateBankBatchNo formID={form.id} />
                    ) : null
                }
                <InvoiceInitialFieldsCashAdvanceNoInputs form={form} />
                <Paper>
                    <Stack spacing={10}>
                        <DataTable
                            horizontalSpacing="xs"
                            verticalSpacing={6}
                            minHeight={100}
                            records={form?.items.concat(Array(4).fill(null))}
                            columns={[
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
                                    title: 'Description',
                                    accessor: 'description',
                                    width: "230px",
                                },
                                {
                                    title: 'Budget Line',
                                    noWrap: false,
                                    accessor: 'budget_line',
                                    width: "100px",
                                },
                                {
                                    title: 'Unit',
                                    accessor: 'unit',
                                    width: "60px",
                                },
                                {
                                    title: 'No. Unit(s)',
                                    accessor: 'no_of_units',
                                    width: "80px",
                                    noWrap: true,
                                },
                                {
                                    title: 'Rate',
                                    accessor: 'unit_rate',
                                    width: "80px",
                                    ellipsis: false,
                                    render: (item: any) => (
                                        <>{formatCurrency(item?.unit_rate)}</>
                                    )
                                },
                                {
                                    title: `Amount (${form.currency?.toUpperCase()})`,
                                    accessor: 'amount',
                                    width: "100px",
                                    render: (item: any) => (
                                        <>{formatCurrency(item?.amount)}</>
                                    )
                                }
                            ]}
                        />
                        <Group position="right">
                            <Title order={3} weight={600} size={"xs"}>Total</Title>
                            <Title order={3} weight={600} size={"xs"}>
                                {`${form.currency?.toUpperCase()} ${formatCurrency(form?.total)}`}
                            </Title>
                        </Group>
                    </Stack>
                </Paper>

                <ApprovalsSection>
                    <ApprovalPersonNoInput title="Requested By" person={form?.requested_by} />
                    <UpdateContingencyFields title="Checked By" nextLevel={2} field={'checked_by'} data={form?.checked_by} formID={form?.id} userId={userId} checker={form?.checker} requestedBy={form?.requested_by?.id} />

                    <UpdateContingencyFields title="Approved By" nextLevel={3} field={'approved_by'} data={form?.approved_by} formID={form?.id} userId={userId} checker={form?.approver} requestedBy={form?.requested_by?.id} />

                    <UpdateContingencyFields title="Amount Received" nextLevel={4} field={'amount_received'} data={form?.amount_received} formID={form?.id} userId={userId} checker={form?.checker} requestedBy={form?.requested_by?.user.id} />

                </ApprovalsSection>
                <InvoiceFooter />
            </Stack>
        </Paper>
    )
})

RenderCashAdvanceForm.displayName = 'RenderCashAdvanceForm'
export default RenderCashAdvanceForm