import { Stack, Switch, Text, Title } from "@mantine/core"
import { DataTable } from "mantine-datatable"
import { makeRequestOne, toDate } from "../../../config/config"
import AdminWrapper from "../../../layouts/AdminWrapper"
import requireAdminMiddleware from "../../../middleware/requireAdminMiddleware"
import { LOCAL_STORAGE_KEYS, URLS } from "../../../config/constants"
import customRedirect from "../../../middleware/redirectIfNoAuth"

interface IUsers {
  users: any
}

const Users = ({ users }: IUsers) => {

  return (
    <div>
      <Stack>
        <Title>Users</Title>
        <DataTable
          minHeight={150}
          records={users}
          columns={[
            {
              accessor: "id",
              title: "#",
              render: (user: any, i: number) => (
                <Text>{i + 1}</Text>
              )
            },
            {
              accessor: 'full_name',
              title: 'Name',
            },
            {
              accessor: 'username',
              title: 'Username'
            },
            {
              accessor: 'is_superuser',
              title: 'Status',
              render: (user: any) => (
                user?.is_superuser ? <Switch mx="auto" checked={true} color="green" /> : ''
              )
            },
            {
              accessor: 'profile.approver',
              title: 'Approver',
              render: (user: any) => (
                user?.profile?.approver ? <Switch mx="auto" checked={true} color="green" /> : ''
              )
            },
            {
              accessor: 'profile.checker',
              title: 'Checker',
              render: (user: any) => (
                user?.profile?.checker ? <Switch mx="auto" checked={true} color="green" /> : ''
              )
            },
            {
              accessor: "date_joined",
              title: "Date Joined",
              render: (user: any) => (
                <Text>{toDate(user?.date_joined, true)}</Text>
              )
            },
          ]}
        // onRowClick={(project: any) => {
        //   router.push(`/admin/projects/${project?.name}/${project?.id}`)
        // }}
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

  const usersQuery = makeRequestOne({
    url: URLS.USERS,
    method: "GET",
    params: {
      limit: 100,
      fields: 'username,email,full_name,name,code,is_superuser,last_login,date_joined,profile,checker,approver'
    },
    extra_headers: {
      authorization: `Bearer ${token}`
    }
  })



  return Promise.allSettled([usersQuery]).then((res) => {
    const users: any = res[0]

    if (users?.status === 'rejected') {
      customRedirect(context.req, context.res)
    }
    return {
      props: {
        users: users?.value?.data?.results
      }
    }
  })

}

Users.PageLayout = AdminWrapper
export default Users