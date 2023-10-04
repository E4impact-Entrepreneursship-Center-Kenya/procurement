import { Button, Grid, TextInput, ActionIcon, Center, Stack, Box, LoadingOverlay, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Prism } from '@mantine/prism'
import { IconTrash } from '@tabler/icons'
import React, { useState } from 'react'
import { makeRequestOne } from '../../../config/config'
import { showNotification } from '@mantine/notifications'
import { displayErrors } from '../../../config/functions'
import { useAppContext } from '../../../providers/appProvider'
import { URLS } from '../../../config/constants'
import { useRouter } from 'next/router'

class BudgetLine {
    constructor(project: number | string, created_by: string | number) {
        this.project = project
        this.code = ""
        this.text = ""
        this.created_by = created_by
    }
    project: string | number
    code: string
    text: string
    created_by: string | number
}

interface IAddBudgetLines {
    projectID: string | number
}

const AddBudgetLines = ({ projectID }: IAddBudgetLines) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { token, user_id } = useAppContext()
    const router = useRouter()

    const form = useForm({
        initialValues: {
            budget_lines: [

            ],

        },
        validate: {
            // budget_lines: {
            //     code: value => value === "" ? "Code is required" : null,
            //     description: value => value === "" ? "Description is required" : null,
            // }
        }
    })

    const addNewBudgetLine = () => {
        form.insertListItem('budget_lines', new BudgetLine(projectID, user_id))
    }

    const deleteLine = (i: number) => {
        form.removeListItem('budget_lines', i)
    }

    const handleSave = () => {

        setLoading(true)
        makeRequestOne({
            url: URLS.BUDGET_LINES,
            data: form.values.budget_lines,
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
            form.reset()
            router.reload()
        }).catch((err: any) => {
            const errors = err.response.data
            displayErrors(form, errors)
            showNotification({
                message: "Something went wrong! Check that you have not repeated the budget lines for this project",
                color: "red"
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <Stack style={{
                position: "relative"
            }}>
                <LoadingOverlay visible={loading} />
                <form onSubmit={form.onSubmit(values => handleSave())}>
                    {
                        form.values.budget_lines.map((bl: BudgetLine, i: number) => (
                            <Grid key={`line_${i}`}>
                                <Grid.Col md={11}>
                                    <Grid>
                                        <Grid.Col span={4}>
                                            <TextInput placeholder='1.1.1' required {...form.getInputProps(`budget_lines.${i}.code`)} />
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <TextInput placeholder='Activity' required {...form.getInputProps(`budget_lines.${i}.text`)} />
                                        </Grid.Col>
                                    </Grid>
                                </Grid.Col>
                                <Grid.Col md={1}>
                                    <Center>
                                        <ActionIcon color='red' onClick={() => deleteLine(i)}>
                                            <IconTrash />
                                        </ActionIcon>
                                    </Center>
                                </Grid.Col>
                            </Grid>
                        ))
                    }
                    <Group position='apart' mt={10}>
                        <Button onClick={addNewBudgetLine} radius={'md'}>
                            Add New Line
                        </Button>
                        <Button radius={'md'} type='submit' disabled={form.values.budget_lines.length === 0}>Add to Project</Button>
                    </Group>
                </form>
            </Stack>
        </div>
    )
}

export default AddBudgetLines