import { Grid, TextInput, Select, Stack, Text, List } from '@mantine/core'
import React from 'react'
import { DateInput } from '@mantine/dates'
import { COUNTRIES, CURRENCIES } from '../../../config/constants'


const requirements: string[] = [
    "This quotation is NOT an order",
    "The quotation MUST indicate the final unit and extended price in….   (Indicate the applicable currency)(inclusive of all STATUTORY TAXES)",
    "The quotation MUST be signed and bear the official rubber stamp of the vendor",
    "The Quotation should indicate LEAD TIME(duration) for delivery of the items",
    "Indicate all TERMS AND CONDITIONS of the purchase in the space provided."
]


interface IProps {
    form: any
    projects: any
}

const RequestForQuotationFields = ({ form, projects }: IProps) => {
    return (
        <Stack spacing={6}>
            <Grid>
                <Grid.Col md={2}>
                    <Select
                        label="Country"
                        {...form.getInputProps('country')}
                        data={COUNTRIES.map((e: any) => ({
                            label: e.country,
                            value: e.country
                        }))}
                    />
                </Grid.Col>
                <Grid.Col md={2}>
                    <Select
                        label="Currency"
                        {...form.getInputProps('currency')}
                        data={CURRENCIES.map((cur: string) => ({
                            label: cur.toUpperCase(),
                            value: cur
                        }))}
                    />
                </Grid.Col>
                <Grid.Col md={4}>
                    <TextInput {...form.getInputProps('vendor_name')} label="Vendor Name" placeholder='Vendor Name' />
                </Grid.Col>
                <Grid.Col md={4}>
                    <TextInput {...form.getInputProps('address')} label="Address" placeholder='Address' />
                </Grid.Col>
                <Grid.Col md={4}>
                    <TextInput {...form.getInputProps('phone_no')} label="Phone No" placeholder='Phone No' />
                </Grid.Col>
            </Grid>
            <Text>
                You are invited to submit your quotation for the items listed below.
                As you fill in the details, please take note of the following:
            </Text>
            <List type='ordered'>
                {
                    requirements?.map((req: string, i: number) => (
                        <List.Item key={`req_${i}`} >
                            <Text size={'sm'}>{req}</Text>
                        </List.Item>
                    ))
                }
            </List>

        </Stack>
    )
}

export default RequestForQuotationFields