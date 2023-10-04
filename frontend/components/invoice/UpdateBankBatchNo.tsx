import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { makeRequestOne } from '../../config/config'
import { URLS } from '../../config/constants'
import { useAppContext } from '../../providers/appProvider'
import { displayErrors } from '../../config/functions'
import { Button, Center, Grid, Group, TextInput } from '@mantine/core'

interface IUpdateBankBatchNo {
    formID: any
}

const UpdateBankBatchNo = (props: IUpdateBankBatchNo) => {
    const { formID } = props
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { token } = useAppContext()
    const updateForm = useForm({
        initialValues: {
            bank_batch_no: ""
        },
        validate: {
            bank_batch_no: value => value === "" ? "Bank Batch No. is required" : null
        }
    })

    function submitUpdateForm() {
        let data: any = updateForm.values

        setLoading(true)
        let url = `${URLS.CASH_ADVANCE_FORMS}/${formID}`
        makeRequestOne({
            url: `${url}`,
            method: "PUT",
            data: data,
            extra_headers: {
                authorization: `Bearer ${token}`,
            },
            params: {
                fields: "bank_batch_no"
            }
        }).then(res => {
            showNotification({
                message: "Bank batch updated",
                color: "green"
            })
            router.reload()
        }).catch(err => {
            const errors = err?.response?.data
            displayErrors(updateForm, errors)
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
            <form onSubmit={updateForm.onSubmit(values => submitUpdateForm())}>
                <Grid>
                    <Grid.Col span={8}>
                        <TextInput label="Bank Batch No." description="Confirm before updating (Not Editable)" {...updateForm.getInputProps('bank_batch_no')} radius="md" placeholder='Bank Batch No.' />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Group align='end' className='h-100'>
                            <Button radius={'md'} loading={loading} type='submit'>Update</Button>
                        </Group>
                    </Grid.Col>
                </Grid>
            </form>
        </div>
    )
}

export default UpdateBankBatchNo