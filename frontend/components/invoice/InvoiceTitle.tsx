import { Box, Group, Paper, Text, TextInput } from '@mantine/core'
import React from 'react'


export interface IInvoiceTitle {
    title: string
    invoice_number?: string
    batch_number?: string
}

const InvoiceTitle = ({ title, invoice_number, batch_number }: IInvoiceTitle) => {
    return (
        <div>
            <Paper py={4} sx={theme => ({
                border: `1px solid ${theme.colors.green[6]}`
            })}>
                <Group spacing={10} position='center' align='center'>
                    <Text color="green" weight={600} align='center' size={'xs'}>{title}</Text>
                    {
                        invoice_number ? (
                            <Text size={'xs'}>{invoice_number}</Text>
                        ) : (
                            <TextInput size='xs' maw={100} disabled placeholder='No.' />
                        )
                    }
                    <Box>|</Box>
                    <Text size={'xs'}>Bank Batch No.</Text>
                    {
                        batch_number ? (
                            <Text size={'xs'}>{batch_number}</Text>
                        ) : (
                            <TextInput size={'xs'} maw={100} disabled placeholder='No.' />
                        )
                    }
                </Group>
            </Paper>
        </div>
    )
}


export default InvoiceTitle