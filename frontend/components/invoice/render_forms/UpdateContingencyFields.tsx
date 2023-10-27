import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { formatDateToYYYYMMDD, makeRequestOne } from '../../../config/config'
import { useAppContext } from '../../../providers/appProvider'
import ApprovalPerson, { ApprovalPersonNoInput } from '../Approvals'
import { Box, Button, Grid, Group, LoadingOverlay } from '@mantine/core'

interface IUpdateContingencyFields {
    formID?: any,
    data: any
    field: string
    max_level?: any
    nextLevel: number
    title: string
    userId: any
    checker: any
    requestedBy: any
    form_url?: string
    field_update_url?: string
}

const UpdateContingencyFields = ({ data, field, nextLevel, title, userId, checker, requestedBy, max_level, form_url, field_update_url }: IUpdateContingencyFields) => {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { user, user_id, token } = useAppContext()
    const updateForm = useForm({
        initialValues: {
            [field]: {
                amount: "",
                user: "",
                signature: "",
                date: ""
            }
        }
    })

    function submitUpdateForm() {
        let data: any = updateForm.values
        const formData = new FormData()
        formData.append("amount", data[field].amount)
        formData.append("receipt", data[field].receipt)
        formData.append('user', user_id)
        formData.append('signature', data[field].signature)
        formData.append('date', formatDateToYYYYMMDD(data[field].date))

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
            let updateData = {
                level: nextLevel,
                [field]: res?.data?.id
            }
            if (nextLevel === max_level) {
                updateData.is_complete = true
            }
            makeRequestOne({
                url: `${form_url}`,
                method: 'PUT',
                extra_headers: {
                    authorization: `Bearer ${token}`,
                },
                data: updateData
            }).then(() => {
                showNotification({
                    message: "update successful"
                })
                router.reload()
            }).catch(() => { })
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
        <div>
            <Box style={{ position: 'relative' }}>
                <LoadingOverlay visible={loading} />
                {
                    data ? (
                        <ApprovalPersonNoInput title={title} person={data} level={nextLevel} />
                    ) : (
                        <>
                            {
                                nextLevel === 4 ? (
                                    <>
                                        {
                                            requestedBy === userId ? (
                                                <form onSubmit={updateForm.onSubmit(values => submitUpdateForm())}>
                                                    <Grid>
                                                        <Grid.Col md={10}>
                                                            <ApprovalPerson person={title} form={updateForm} field_prefix={field} field_name={'amount'} active={true} level={nextLevel} />
                                                        </Grid.Col>
                                                        <Grid.Col md={2}>
                                                            <Group className='h-100' align='center' position='center'>
                                                                <Button type='submit'>Update</Button>
                                                            </Group>
                                                        </Grid.Col>
                                                    </Grid>
                                                </form>
                                            ) : (
                                                <ApprovalPerson person={title} form={updateForm} field_prefix={field} field_name={'amount'} active={false} level={nextLevel} />
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            (checker === userId) ? (
                                                <form onSubmit={updateForm.onSubmit(values => submitUpdateForm())}>
                                                    <Grid>
                                                        <Grid.Col md={10}>
                                                            <ApprovalPerson person={title} form={updateForm} field_prefix={field} field_name={'user'} active={true} level={nextLevel} />
                                                        </Grid.Col>
                                                        <Grid.Col md={2}>
                                                            <Group className='h-100' align='center' position='center'>
                                                                <Button type='submit'>Update</Button>
                                                            </Group>
                                                        </Grid.Col>
                                                    </Grid>
                                                </form>
                                            ) : <ApprovalPerson person={title} form={updateForm} field_prefix={field} field_name={'user'} active={false} level={nextLevel} />
                                        }
                                    </>
                                )
                            }

                        </>
                    )
                }
            </Box>
        </div >
    )
}

export default UpdateContingencyFields