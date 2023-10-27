import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { useAppContext } from '../../../providers/appProvider'
import { makeRequestOne } from '../../../config/config'
import { showNotification } from '@mantine/notifications'
import { URLS } from '../../../config/constants'
import { displayErrors } from '../../../config/functions'
import { Button, Card, Grid, Group, TextInput } from '@mantine/core'
import { useRouter } from 'next/router'

const AddNewProject = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { token, user_id } = useAppContext()
    const router = useRouter()

    const form = useForm({
        initialValues: {
            name: "",
            code: "",
        },
        validate: {
            name: value => value === "" ? "Project name is required" : null,
            code: value => value === "" ? "Project code is required" : null,
        }
    })

    const handleSave = () => {

        setLoading(true)
        makeRequestOne({
            url: URLS.PROJECTS,
            data: {
                ...form.values,
                created_by: user_id
            },
            method: 'POST',
            extra_headers: {
                authorization: `Bearer ${token}`
            },
            useNext: true
        }).then((res: any) => {
            showNotification({
                title: "Success",
                message: "Budget Lines added successfully",
                color: "green"
            })
        }).catch((err: any) => {
            const errors = err.response.data
            displayErrors(form, errors)
        }).finally(() => {
            setLoading(false)
            form.reset()
            router.reload()
        })
    }

    return (
        <div>
            <Card radius="md">
                <form onSubmit={form.onSubmit(values => handleSave())}>
                    <Grid>
                        <Grid.Col md={4}>
                            <TextInput label="Project Name" placeholder='Project Name' {...form.getInputProps('name')} />
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <TextInput label="Project Code" placeholder='Project Code' {...form.getInputProps('code')} />
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <Group className='h-100' align='end' position='center'>
                                <Button mt="md" type='submit' disabled={form.values.name === "" || form.values.code === "" }>Save Project</Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default AddNewProject