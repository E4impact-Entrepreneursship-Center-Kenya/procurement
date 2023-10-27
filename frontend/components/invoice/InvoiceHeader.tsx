import { Grid, Group, Stack, Text } from '@mantine/core'
import React from 'react'
import InvoiceTitle from './InvoiceTitle'

interface IProps {
    form?: any
    invoice_number?: any
    batch_number?: any
    title?: any
}

const InvoiceHeader = (props: IProps) => {
    const { form, title, batch_number } = props
    return (
        <Grid>
            <Grid.Col span={9}>
                <InvoiceTitle title={title} invoice_number={form?.invoice_number} batch_number={batch_number} />
            </Grid.Col>
            <Grid.Col span={3}>
                <Group position='right'>
                    <Stack spacing={0} align='right'>
                        <Text size="xs">E4Impact Foundation</Text>
                        <Text size="xs">Via San Vittore, 18</Text>
                        <Text size="xs">20133 Milano, Italy</Text>
                        <Text size="xs">PIV: 09311470968</Text>
                    </Stack>
                </Group>
            </Grid.Col>
        </Grid>
    )
}

export default InvoiceHeader