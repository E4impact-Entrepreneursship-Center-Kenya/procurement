import { Grid, TextInput, Select, Stack, Text, List, Title } from '@mantine/core'
import React from 'react'
import { COUNTRIES, CURRENCIES } from '../../../config/constants'


const requirements: string[] = [
    "This quotation is NOT an order",
    "The quotation MUST indicate the final unit and extended price in….   (Indicate the applicable currency)(inclusive of all STATUTORY TAXES)",
    "The quotation MUST be signed and bear the official rubber stamp of the vendor",
    "The Quotation should indicate LEAD TIME(duration) for delivery of the items",
    "Indicate all TERMS AND CONDITIONS of the purchase in the space provided."
]

export const RequestForQuoatationExtraInfo = () => {

    return (
        <>
            <Title ta={'center'} fw={600} order={3}>CERTIFY</Title>
            <Text size={'md'} mb={0} ta={'center'}>
                That the work has been done and completed satisfactorily in accordance with the Bill of
                Quantities/TOR.
            </Text>
        </>
    )
}


interface IProps {
    form: any
    projects: any
}

const WorkCompletionCertificateFields = ({ form, projects }: IProps) => {
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
                    <TextInput {...form.getInputProps('project')} label="Project" placeholder='Project' />
                </Grid.Col>
                <Grid.Col md={4}>
                    <TextInput {...form.getInputProps('subject')} label="Subject" placeholder='Subject' />
                </Grid.Col>
                <Grid.Col md={4}>
                    <TextInput {...form.getInputProps('my_name')} label="Your Name" placeholder='Name' description="Your name" />
                </Grid.Col>
                <Grid.Col md={4}>
                    <TextInput {...form.getInputProps('position')} label="Position" placeholder='Your Position' description="Position i.e Country Manager/Project Manager" />
                </Grid.Col>
            </Grid>
            <RequestForQuoatationExtraInfo />
        </Stack>
    )
}

export default WorkCompletionCertificateFields