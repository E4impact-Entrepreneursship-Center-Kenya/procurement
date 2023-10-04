import React from 'react'
import AdminWrapper from '../../../layouts/AdminWrapper'
import requireAdminMiddleware from '../../../middleware/requireAdminMiddleware'
import SEOHeader, { SEOHeaderProps } from '../../../components/seo/SEOHeader'
import { APP_NAME, LOCAL_STORAGE_KEYS, SEPARATOR, URLS } from '../../../config/constants'
import { Stack, Text, Title } from '@mantine/core'
import { DataTable } from 'mantine-datatable'
import { makeRequestOne, toDate } from '../../../config/config'
import { useRouter } from 'next/router'
import AddNewProject from '../../../components/invoice/projects/AddNewProject'
import customRedirect from '../../../middleware/redirectIfNoAuth'

interface IProjects {
    projects: any
}

const Projects = ({ projects }: IProjects) => {

    const router = useRouter()

    const SEO_DETAILS: SEOHeaderProps = {
        url: '',
        title: `${APP_NAME} ${SEPARATOR} Projects`,
        description: '',
        keywords: '',
        image: '',
        twitter_card: ''
    }



    return (
        <div>
            <SEOHeader {...SEO_DETAILS} />
            <Stack>
                <Title>Projects</Title>
                <AddNewProject />
                <DataTable
                    minHeight={150}
                    records={projects}
                    columns={[
                        {
                            accessor: "id",
                            title: "#",
                        },
                        {
                            accessor: 'name',
                            title: 'Project Name'
                        },
                        {
                            accessor: 'code',
                            title: 'Project Code'
                        },
                        {
                            accessor: "created_on",
                            title: "Created On",
                            render: (project: any) => (
                                <Text>{toDate(project?.created_on, true)}</Text>
                            )
                        },
                        {
                            accessor: "created_by.full_name",
                            title: "Created By"
                        }
                    ]}
                    onRowClick={(project: any) => {
                        router.push(`/admin/projects/${project?.name}/${project?.id}`)
                    }}
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

    const projectsQuery = makeRequestOne({
        url: URLS.PROJECTS,
        method: "GET",
        params: {
            limit: 100,
            fields: 'id,created_by,full_name,name,code,created_on'
        },
        extra_headers: {
            authorization: `Bearer ${token}`
        }
    })

    return Promise.allSettled([projectsQuery]).then((res) => {
        const projects: any = res[0]

        if (projects?.status === 'rejected') {
            customRedirect(context.req, context.res)
        }
        return {
            props: {
                projects: projects?.value?.data?.results
            }
        }
    })
}

Projects.PageLayout = AdminWrapper
export default Projects