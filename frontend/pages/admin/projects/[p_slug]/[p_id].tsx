import React from 'react'
import AdminWrapper from '../../../../layouts/AdminWrapper'
import { makeRequestOne, toDate } from '../../../../config/config'
import { LOCAL_STORAGE_KEYS, URLS } from '../../../../config/constants'
import requireAdminMiddleware from '../../../../middleware/requireAdminMiddleware'
import { Breadcrumbs, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { DataTable } from 'mantine-datatable'
import AddBudgetLines from '../../../../components/invoice/projects/AddBudgetLines'
import customRedirect from '../../../../middleware/redirectIfNoAuth'


interface ISingleProject {
    project: any
    budget_lines: any
}

const SingleProject = ({ project, budget_lines }: ISingleProject) => {
    return (
        <div>
            <Breadcrumbs>
                <Link href={'/admin/projects'}>
                    Projects
                </Link>
                <Text>
                    {project?.name}
                </Text>
            </Breadcrumbs>
            <Stack mt="md">
                <Title>{`Project: ${project?.name}`}</Title>
                <AddBudgetLines projectID={project?.id} />
                <Title order={2}>Budget Lines</Title>
                <DataTable
                    minHeight={150}
                    records={budget_lines}
                    verticalSpacing="sm"
                    columns={[
                        {
                            accessor: "id",
                            title: "#",
                            width: "30px",
                            render: (budget_line: any, i: number) => (
                                <Text>{i + 1}</Text>
                            )
                        },
                        {
                            accessor: "code",
                            title: "Budget Line",
                            width: "80px",
                        },
                        {
                            accessor: "text",
                            title: "Description",
                            width: "140px",
                        },
                        {
                            accessor: "created_by.full_name",
                            title: "Created By",
                            width: "100px",
                        },
                        {
                            accessor: "created_on",
                            title: "Created On",
                            width: '100px',
                            render: (budget_line: any, i: number) => (
                                <Text>{toDate(budget_line?.created_on, false)}</Text>
                            )
                        },
                        {
                            accessor: "updated_on",
                            title: "Modified On",
                            width: '100px',
                            render: (budget_line: any, i: number) => (
                                <Text>{toDate(budget_line?.updated_on, false)}</Text>
                            )
                        },
                    ]}

                />
            </Stack>
        </div>
    )
}

export const getServerSideProps = async (context: any) => {
    requireAdminMiddleware(context.req, context.res, () => { })

    const cookies = context.req.cookies
    // const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.token]
    const token = cookies[LOCAL_STORAGE_KEYS.token]

    const { params, query } = context
    const page = query?.page ?? 1

    for (let key in query) {
        if (query.hasOwnProperty(key)) {
            if (query[key] === null || query[key] === 'null' || query[key] === '') {
                delete query[key];
            }
        }
    }

    const projectQuery = makeRequestOne({
        url: `${URLS.PROJECTS}/${params?.p_id}`,
        method: "GET",
        params: {
            limit: 100,
            fields: 'id,created_by,full_name,name,created_on'
        },
        extra_headers: {
            authorization: `Bearer ${token}`
        }
    })

    const budgetLinesQuery = makeRequestOne({
        url: URLS.BUDGET_LINES,
        method: "GET",
        params: {
            ...query,
            project: params?.p_id,
            limit: 100,
            fields: 'id,created_by,full_name,name,created_on,code,text,updated_on'
        },
        extra_headers: {
            authorization: `Bearer ${token}`
        }
    })


    return Promise.allSettled([projectQuery, budgetLinesQuery]).then((res) => {
        const project: any = res[0]
        const budgetlines: any = res[1]

        if (project?.status === 'rejected') {
            customRedirect(context.req, context.res)
        }
        return {
            props: {
                project: project?.value?.data,
                budget_lines: budgetlines?.value?.data.results
            }
        }
    })
}

SingleProject.PageLayout = AdminWrapper
export default SingleProject