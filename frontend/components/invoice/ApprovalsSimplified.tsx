import { Anchor, Button, FileInput, Grid, Group, Image, LoadingOverlay, NumberInput, Overlay, Radio, Switch, Text, TextInput, Title } from '@mantine/core'
import React, { useState } from 'react'
import { DateInput } from "@mantine/dates"
import { formatCurrency, formatDateToYYYYMMDD, makeRequestOne, toDate } from '../../config/config'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useAppContext } from '../../providers/appProvider'

interface IApprovalPerson {
    person: string
    form: any
    field_prefix: any
    field_name: string
    active: boolean
    level: number
    field_update_url?: any
}

const ApprovalPerson = ({ person, form, field_prefix, field_name, active, level }: IApprovalPerson) => {

    return (
        <Grid style={{ position: 'relative' }} py="sm" columns={3}>
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

interface IUpdate {
    inputLabel: string, formID: any, field_prefix: string, field_name: any, active: boolean, field_update_url: string, formName: string, data: any, currency: any
}

export const UpdateApprovalField = ({ inputLabel, formID, field_prefix, field_name, active, field_update_url, formName, data, currency }: IUpdate) => {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { user, user_id, token } = useAppContext()
    const form = useForm({
        initialValues: {
            [field_prefix]: {
                amount: "",
                user: "",
                signature: "",
                date: ""
            }
        }
    })

    function submitUpdateForm() {
        let data: any = form.values
        const formData = new FormData()
        formData.append('form_id', formID)
        formData.append('form_name', formName)
        formData.append('field_name', field_prefix)
        formData.append("amount", data[field_prefix].amount)
        formData.append("receipt", data[field_prefix].receipt)
        formData.append('user', user_id)
        formData.append('signature', data[field_prefix].signature)
        formData.append('date', formatDateToYYYYMMDD(data[field_prefix].date))

        setLoading(true)
        makeRequestOne({
            url: `${field_update_url}`,
            method: "POST",
            data: formData,
            extra_headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }).then(res => {
            showNotification({
                message: "update successful"
            })
            router.reload()
        }).catch(err => {
            showNotification({
                message: err.message,
                color: "red"
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            {
                data ? <ApprovalPersonNoInput title={inputLabel} person={data} field_name={field_name} currency={currency} /> : (
                    <form onSubmit={form.onSubmit(values => submitUpdateForm())} style={{ position: "relative" }}>
                        <LoadingOverlay visible={loading} />
                        <Grid style={{ position: 'relative' }} py="sm">
                            <Overlay hidden={active} />
                            <Grid.Col md={3}>
                                <TextInput label={inputLabel}
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
                            <Grid.Col md={2}>
                                <Group className='h-100' align='center' position='center'>
                                    <Button type='submit'>Update</Button>
                                </Group>
                            </Grid.Col>
                        </Grid>
                    </form>
                )
            }
        </>
    )
}


export const ApprovalPersonNoInput = ({ title, person, field_name, currency }: { person: any, title: string, field_name?: string, currency: any }) => {

    return (
        <Grid style={{ position: 'relative' }} p={0}>
            <Grid.Col span={4} md={5}>
                <Title order={4} weight={500} size={14}>{title}</Title>
                <Text size={'xs'}>
                    {
                        field_name === 'amount' ? `${currency?.toUpperCase()} ${formatCurrency(person?.amount)}` : person?.user?.full_name
                    }
                </Text>
            </Grid.Col>
            <Grid.Col span={4} md={4}>
                <Group align='center'>
                    <Title order={4} weight={500} mb={'mb'} size={14}>
                        {field_name === 'amount' ? `Receipt` : 'Signature'}
                    </Title>
                    {field_name === 'amount' ? (
                        <>
                            <Anchor target='_blank' href={person.receipt} size={'sm'}>
                                <Button size='sm' radius={'md'}>View</Button>
                            </Anchor>
                        </>
                    ) : (
                        <Image src={person?.signature} width={60} alt={field_name === 'amount' ? `Receipt` : 'Signature'} />
                    )}
                </Group>
            </Grid.Col>
            <Grid.Col span={4} md={3}>
                <Group>
                    <Title order={4} weight={500} size={14}>Date</Title>
                    <Text size={"xs"}>{toDate(person?.date)}</Text>
                </Group>
            </Grid.Col>
        </Grid>
    )
}

interface IChoice {
    value: any
    label: string
}

interface IUpdateSingleField {
    field_type: 'radio' | 'number' | 'text' | 'switch'
    field_name: string
    field_value: any
    col_size: number
    label: string
    form_update_url: string
    choices?: IChoice[]
}

export const UpdateSingleFormField = (props: IUpdateSingleField) => {
    const [loading, setLoading] = useState(false)
    const { field_type, field_name, field_value, col_size, label, form_update_url, choices } = props
    const { token } = useAppContext()
    const router = useRouter()

    const form = useForm({
        initialValues: {
            [field_name]: field_value
        }
    })
    function submitUpdateForm() {
        let data: any = form.values
        setLoading(true)
        makeRequestOne({
            url: form_update_url,
            method: "PUT",
            data: data,
            extra_headers: {
                authorization: `Bearer ${token}`,
                // fields: 'budget_avalalability'
            },
            useNext: false
        }).then(res => {
            showNotification({
                message: "update successful"
            })
            router.reload()
        }).catch(err => {
            console.log("Error: ", err)
            showNotification({
                message: err.message,
                color: "red"
            })
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <form onSubmit={form.onSubmit(values => submitUpdateForm())}>
            <Grid py="xs">
                <Grid.Col md={col_size}>
                    {
                        field_type == 'radio' ? (
                            <Radio.Group
                                label={label}
                                withAsterisk
                                {...form.getInputProps(field_name, { type: 'checkbox'})}
                            >
                                <Group mt="xs">
                                    {
                                        choices?.map((choice: IChoice, i: number) => (
                                            <Radio key={`choice_${i}`}  {...choice} />
                                        ))
                                    }
                                </Group>
                            </Radio.Group>
                        ) : null
                    }
                    {
                        field_type == 'switch' ? (
                            <Switch
                                label={label}
                                {...form.getInputProps(field_name, {type: 'checkbox'})}
                            />
                        ) : null
                    }
                    {
                        field_type == 'number' ? (
                            <NumberInput
                                label={label}
                                withAsterisk
                                {...form.getInputProps(field_name)}
                            />
                        ) : null
                    }
                    {
                        field_type == 'text' ? (
                            <TextInput
                                label={label}
                                withAsterisk
                                {...form.getInputProps(field_name)}
                            />
                        ) : null
                    }
                </Grid.Col>
                <Grid.Col md={2}>
                    <Group className='h-100' align='end'>
                        <Button size='xs' radius='sm' type='submit'>Update</Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    )
}

export default ApprovalPerson