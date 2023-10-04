import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { formatDateToYYYYMMDD, makeRequestOne } from '../../../config/config'
import { URLS } from '../../../config/constants'
import { useAppContext } from '../../../providers/appProvider'
import ApprovalPerson, { ApprovalPersonNoInput } from '../Approvals'
import { Box, Button, Grid, Group, LoadingOverlay } from '@mantine/core'


function getMessage(level: any){
    if(level === 2){
        return 'The form has been checked by'
    }
    if(level === 3){
        return 'The form has been approved by'
    }
    if(level === 4){
        return 'Form Receipt updated by'
    }
}

interface IUpdateContingencyFields {
    data: any
    field: string
    formID: any
    nextLevel: number
    title: string
    userId: any
    checker: any
    requestedBy: any
}

const UpdateContingencyFields = ({ data, field, formID, nextLevel, title, userId, checker, requestedBy }: IUpdateContingencyFields) => {

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
        let url = URLS.FORM_USERS
        if (nextLevel === 4) {
            url = URLS.AMOUNT_RECEIVED
        }
        makeRequestOne({
            url: `${url}`,
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
            if (nextLevel === 4) {
                updateData.is_complete = true
            }
            makeRequestOne({
                url: `${URLS.CASH_ADVANCE_FORMS}/${formID}`,
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