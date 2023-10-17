import { Grid, TextInput, Select } from '@mantine/core'
import React from 'react'
import { DateInput } from '@mantine/dates'
import { COUNTRIES, CURRENCIES } from '../../../config/constants'



interface IProps {
    form: any
    projects: any
}

const PurchaseRequisitionFields = ({ form, projects }: IProps) => {
    return (
        <div>
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
                    <DateInput {...form.getInputProps('requisition_date')} label="Requisition Date" placeholder='Requisition Date' />
                </Grid.Col>
                <Grid.Col md={4}>
                    <DateInput {...form.getInputProps('date_required')} label="Items Required By When" placeholder='Items Required By When' />
                </Grid.Col>
                <Grid.Col md={6}>
                    <Select {...form.getInputProps('project')} label="Project" placeholder='Project' data={projects?.map((project: any) => ({ label: project.name, value: project?.id?.toString() }))} />
                </Grid.Col>
                <Grid.Col md={6}>
                    <TextInput {...form.getInputProps('delivered_to')} label="Delivered To" placeholder='Delivered To' />
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default PurchaseRequisitionFields