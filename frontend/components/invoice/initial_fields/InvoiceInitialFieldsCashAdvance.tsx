import { Grid, Select, Text, TextInput, Textarea, Title } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import React, { useEffect, useMemo } from 'react'
import { toDate } from '../../../config/config'
import { COUNTRIES, CURRENCIES } from '../../../config/constants'

interface IInvoiceInitialFieldsCashAdvance {
    form: any
    projects?: any
}

const addDays = (date: Date, days: number) => {
    if (date) {
        const newDate = new Date(date.getTime());
        newDate.setDate(date.getDate() + days);
        return newDate
    }
    return ''
};

const InvoiceInitialFieldsCashAdvance = ({ form, projects }: IInvoiceInitialFieldsCashAdvance) => {

    const updateLiquadationDate = (value: Date) => {
        const liquadation_date = addDays(value, 7)
        form.setFieldValue('expected_liquidation_date', liquadation_date)
        form.setFieldValue('activity_end_date', value)
    }

    return (
        <Grid>
            <Grid.Col md={2}>
                <Select
                label="Country"
                {...form.getInputProps('country')}
                data={COUNTRIES.map((e: any) => ({
                    label: e.country,
                    value: e.country
                }) )}
                 />
            </Grid.Col>
            <Grid.Col md={2}>
                <Select
                label="Currency"
                {...form.getInputProps('currency')}
                data={CURRENCIES.map((cur: string) => ({
                    label: cur.toUpperCase(),
                    value: cur
                }) )}
                 />
            </Grid.Col>
            <Grid.Col md={5}>
                <TextInput label="Payee"  {...form.getInputProps('name')} placeholder='Enter Name' />
            </Grid.Col>
            <Grid.Col md={3}>
                <DateInput label="Requisition Date" {...form.getInputProps('date')}
                    minDate={new Date()}
                    placeholder='Select Date' />
            </Grid.Col>
            <Grid.Col md={3}>
                <TextInput label="Code (will be prefilled)" {...form.getInputProps('code')} placeholder='Enter Code' disabled />
            </Grid.Col>
            <Grid.Col md={3}>
                <Select label="Project"
                    {...form.getInputProps('project')}
                    placeholder='Project'
                    searchable
                    clearable
                    data={projects?.map((project: any) => ({
                        value: project?.id?.toString(),
                        label: project?.name
                    })) || []} />
            </Grid.Col>
            <Grid.Col md={3}>
                <DateInput label="Activity/Mission End Date"
                //  {...form.getInputProps('activity_end_date')}
                    value={form.values.activity_end_date}
                    onChange={(date_value: Date) => updateLiquadationDate(date_value)}
                    minDate={new Date()}
                    placeholder='Select Date' />
            </Grid.Col>
            <Grid.Col md={3}>
                <DateInput disabled label="Expected Liquidation Date" {...form.getInputProps('expected_liquidation_date')}
                    minDate={new Date()}
                    placeholder='Select Date' />
            </Grid.Col>
            <Grid.Col md={12}>
                <Textarea label="Purpose" autosize minRows={2} {...form.getInputProps('purpose')} placeholder='Give more information about the request' />
            </Grid.Col>
        </Grid>
    )
}


const FormValue = (props: any) => {
    const { title, value } = props
    const mb = 0
    return (
        <>
            <Title order={4} weight={500} mb={mb} size={'sm'}>{title}</Title>
            <Text size="xs">{value}</Text>
        </>
    )
}

export const InvoiceInitialFieldsCashAdvanceNoInputs = ({ form }: IInvoiceInitialFieldsCashAdvance) => {

    return (
        <Grid>
            <Grid.Col md={4} mb={0} p={0}>
                <FormValue title="Payee" value={form?.name} />
            </Grid.Col>
            <Grid.Col md={4} mb={0} p={0}>
                <FormValue title="Requisition Date" value={toDate(form?.date)} />
            </Grid.Col>
            <Grid.Col md={4} mb={0} p={0}>
                <FormValue title="Code" value={form?.project?.code} />
            </Grid.Col>
            <Grid.Col md={4} mb={0} p={0}>
                <FormValue title="Project" value={form?.project?.name} />
            </Grid.Col>
            <Grid.Col md={4} mb={0} p={0}>
                <FormValue title="Activity/Mission End Date" value={toDate(form?.activity_end_date)} />
            </Grid.Col>
            <Grid.Col md={4} mb={0} p={0}>
                <FormValue title="Expected Liquadation Date" value={toDate(toDate(form?.expected_liquidation_date))} />
            </Grid.Col>
            <Grid.Col md={12} mb={0} p={0}>
                <FormValue title="Purpose" value={form?.purpose} />
            </Grid.Col>
        </Grid>
    )
}

export default InvoiceInitialFieldsCashAdvance