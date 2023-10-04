import { Anchor, Button, FileInput, Grid, Group, Image, Overlay, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import React from 'react'
import { DateInput } from "@mantine/dates"
import { formatCurrency, getTheme, toDate } from '../../config/config'
import { INVOICE_LEVELS } from '../../config/constants'

interface IApprovalPerson {
    person: string
    form: any
    field_prefix: any
    field_name: string
    active: boolean
    level: number
}

const ApprovalPerson = ({ person, form, field_prefix, field_name, active, level }: IApprovalPerson) => {

    return (
        <Grid style={{ position: 'relative' }} py="sm">
            <Overlay hidden={active} />
            <Grid.Col md={5}>
                <TextInput label={person}
                    {...form.getInputProps(`${field_prefix}.${field_name}`)}
                    placeholder={field_name === 'amount' ? 'Enter Amount' : 'Enter Your Name'} />
            </Grid.Col>
            <Grid.Col md={4}>
                {
                    field_name === 'amount' ? (
                        <FileInput disabled={!active} label="Receipt" accept='application/pdf'
                            {...form.getInputProps(`${field_prefix}.receipt`)}
                            placeholder='Upload Receipt - PDFs only'
                        />
                    ) : (
                        <FileInput disabled={!active} label="Signature" accept='image/*'
                            {...form.getInputProps(`${field_prefix}.signature`)}
                            placeholder='Upload Your Signature'
                        />
                    )
                }
            </Grid.Col>
            <Grid.Col md={3}>
                <DateInput disabled={!active} label="Date"
                    {...form.getInputProps(`${field_prefix}.date`)}
                    minDate={new Date()}
                    placeholder='Select Date' />
            </Grid.Col>
        </Grid>
    )
}

function isPDF(src: string) {
    if (!src) return ''
    if (src.endsWith('.pdf')) {
        return true
    }
    else {
        return false
    }
}

export const ApprovalPersonNoInput = ({ title, person, level }: { person: any, title: string, level?: number }) => {

    return (
        <Grid style={{ position: 'relative' }} p={0}>
            <Grid.Col md={5}>
                <Title order={4} weight={500} size={14}>{title}</Title>
                <Text size={'xs'}>
                    {
                        level === 4 ? `KSH ${formatCurrency(person?.amount)}` : person?.user?.full_name
                    }
                </Text>
            </Grid.Col>
            <Grid.Col md={4}>
                <Group align='center'>
                    <Title order={4} weight={500} mb={'mb'} size={14}>
                        {level === 4 ? `Receipt` : 'Signature'}
                    </Title>
                    {level === 4 ? (
                        <>
                            <Anchor target='_blank' href={person.receipt} size={'sm'}>
                                <Button size='sm' radius={'md'}>View</Button>
                            </Anchor>
                            {/* {
                                isPDF(person?.receipt) ? (
                                    <Anchor target='_blank' href={person.receipt}>
                                        <Button size='sm' radius={'md'}>Download</Button>
                                    </Anchor>
                                ) : (
                                    <>
                                        <Image src={person?.receipt} maw={'100%'} alt={level === 4 ? `Receipt` : 'Signature'} />

                                        <Anchor target='_blank' href={person.receipt}>
                                            <Button size='sm' radius={'md'}>Download</Button>
                                        </Anchor>
                                    </>
                                )
                            } */}
                        </>
                    ) : (
                        <Image src={person?.signature} width={60} alt={level === 4 ? `Receipt` : 'Signature'} />
                    )}
                </Group>
            </Grid.Col>
            <Grid.Col md={3}>
                <Group>
                    <Title order={4} weight={500} size={14}>Date</Title>
                    <Text size={"xs"}>{toDate(person?.date)}</Text>
                </Group>
            </Grid.Col>
        </Grid>
    )
}

export default ApprovalPerson