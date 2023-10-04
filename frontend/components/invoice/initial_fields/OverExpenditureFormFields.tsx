import { Grid, Select, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import React from 'react'
import { COUNTRIES, CURRENCIES } from '../../../config/constants'

interface IProps {
    form: any
}

const OverExpenditureFormFields = ({ form }: IProps) => {

    return (
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
                <TextInput label="Payee" {...form.getInputProps('payee')} placeholder='Payee' />
            </Grid.Col>
            <Grid.Col md={4}>
                <DateInput label="Date" {...form.getInputProps('date')} placeholder='Date' />
            </Grid.Col>
        </Grid>
    )
}

export default OverExpenditureFormFields