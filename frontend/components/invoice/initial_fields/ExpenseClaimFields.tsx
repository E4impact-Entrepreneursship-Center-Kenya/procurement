import { Grid, Select, TextInput, Textarea } from '@mantine/core'
import React from 'react'
import { COUNTRIES, CURRENCIES } from '../../../config/constants'

interface IProps {
    form: any
    projects: any
    budgetLines: any
    resetBudgetLines: any
}

const ExpenseClaimFields = ({ form, projects, budgetLines, resetBudgetLines }: IProps) => {

    const change = () => {
        form.setFieldValue('budget_line', '')
        // resetBudgetLines()
    }

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
                    <TextInput {...form.getInputProps('name')} label="Name" placeholder='Name' />
                </Grid.Col>
                <Grid.Col md={4}>
                    <Select {...form.getInputProps('project')} onBlur={change} label="Project" placeholder='Project' data={projects?.map((project: any) => ({ label: project.name, value: project?.id?.toString() }))} />
                </Grid.Col>
                <Grid.Col md={6}>
                    <Select {...form.getInputProps('budget_line')} searchable label="Budget Line" placeholder='Budget Line' data={budgetLines?.map((bl: any) => ({ label: bl.code, value: bl?.id?.toString() }))} />
                </Grid.Col>
                <Grid.Col md={6}>
                    <TextInput {...form.getInputProps('cash_advance_received')} label="Cash Advance Received" placeholder='Cash Advance Received' />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea {...form.getInputProps('purpose')} label="Purpose" placeholder='Give some more information' />
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default ExpenseClaimFields