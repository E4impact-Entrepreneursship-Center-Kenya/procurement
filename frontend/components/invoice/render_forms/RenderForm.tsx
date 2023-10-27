import React, { forwardRef, useEffect, useState } from 'react'
import { Stack, Paper, Group, Title, Image, Grid, ColSpan, Box } from '@mantine/core'
import { DataTable, DataTableColumn } from 'mantine-datatable'
import { formatCurrency } from '../../../config/config'
import InvoiceFooter from '../InvoiceFooter'
import InvoiceHeader from '../InvoiceHeader'
import { useForm } from '@mantine/form'
import { useAppContext } from '../../../providers/appProvider'
import { FOUNDATION_LOGO, WEBSITE_LOGO } from '../../../config/constants'
import FormValue from '../initial_fields/FormValue'


export const RenderInitialAndOtherFields = ({ fields }: { fields: any }) => {
    return (
        <Grid>
            {
                fields.map((field: InitialField, i: number) => (
                    <Grid.Col span={field.grid_size} md={field.grid_size} mb={0} p={0} key={`intial_${i}`}>
                        <FormValue title={field.label} value={field.value} />
                    </Grid.Col>
                ))
            }
        </Grid>
    )
}

interface InitialField {
    label: string
    value: any
    grid_size: ColSpan
}

// interface ColumnProps {
//     label: string
//     value: any
//     width: string
//     render?: any
// }

interface IRenderForm {
    form_title: string
    form: any
    userId: any
    initial_fields: InitialField[]
    table_columns: DataTableColumn<any>[]
    children: any
    extra_info_before_table?: any
    hideTotal?: boolean
}
const RenderForm = forwardRef(({ form, userId, initial_fields, table_columns, form_title, children, extra_info_before_table, hideTotal }: IRenderForm, ref: any) => {
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
                <InvoiceHeader invoice_number={form?.invoice_number} batch_number={form?.bank_batch_no} title={`${form_title}  (${form.currency?.toUpperCase()})`} />

                <RenderInitialAndOtherFields fields={initial_fields} />
                {extra_info_before_table}
                <Paper>
                    <Stack spacing={10}>
                        <DataTable
                            horizontalSpacing="xs"
                            verticalSpacing={6}
                            minHeight={100}
                            records={form?.items}
                            columns={table_columns}
                        />
                        <Box sx={{
                            display: hideTotal ? 'none' : 'block'
                        }}>
                            <Group position="right">
                                <Title order={3} weight={600} size={"xs"}>Total</Title>
                                <Title order={3} weight={600} size={"xs"}>
                                    {`${form.currency?.toUpperCase()} ${formatCurrency(form?.total)}`}
                                </Title>
                            </Group>
                        </Box>
                    </Stack>
                </Paper>
                {children}
                <InvoiceFooter />
            </Stack>
        </Paper>
    )
})

RenderForm.displayName = 'RenderForm'
export default RenderForm