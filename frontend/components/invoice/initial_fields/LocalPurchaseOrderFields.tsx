import { Stack, Grid, TextInput, List, Text, Select, Title, Radio, Group } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import React from 'react'
import { COUNTRIES, CURRENCIES } from '../../../config/constants'

interface IProps {
    form: any
    projects: any
}
const LocalPurchaseOrderFields = ({ form, projects }: IProps) => {
    return (
        <div>
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
                        <Select {...form.getInputProps('project')} label="Project" placeholder='Project' data={projects?.map((project: any) => ({ label: project.name, value: project?.id?.toString() }))} />
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <Select {...form.getInputProps('budget_line')} label="Budget Line" placeholder='Budget Line' data={projects?.map((project: any) => ({ label: project.name, value: project?.id?.toString() }))} />
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <DateInput {...form.getInputProps('date')} label="Date" placeholder='Date' />
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <Title order={3}>Order Details</Title>
                        <Radio.Group
                            {...form.getInputProps('payment_terms')}
                            label="Payment Terms"
                            withAsterisk
                        >
                            <Group mt="xs">
                                <Radio value="mpesa" label="MPesa" />
                                <Radio value="cheque" label="Cheque" />
                                <Radio value="bank_transfer" label="Bank Transfer" />
                            </Group>
                        </Radio.Group>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <DateInput {...form.getInputProps('delivery_date')} label="Delivery Date" placeholder='Delivery Date' />
                    </Grid.Col>
                    <Grid.Col md={12}>
                        <Title order={3}>Dear</Title>
                        <Grid>
                            <Grid.Col md={4}>
                                <TextInput label="Supplier" placeholder='Supplier' {...form.getInputProps('supplier')} />
                            </Grid.Col>
                            <Grid.Col md={4}>
                                <TextInput label="Address" placeholder='Address' {...form.getInputProps('address')} />
                            </Grid.Col>
                            <Grid.Col md={4}>
                                <TextInput label="Mobile" placeholder='Mobile' {...form.getInputProps('mobile')} />
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                </Grid>
                <Text>
                    Please supply the items listed below, according to your quotation.
                </Text>
            </Stack>
        </div>
    )
}

export default LocalPurchaseOrderFields