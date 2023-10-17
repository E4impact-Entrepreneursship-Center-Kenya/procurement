import React, { useEffect, useState } from 'react'
import HeaderAndFooterWrapper from '../../../../layouts/HeaderAndFooterWrapper'
import requireAuthMiddleware from '../../../../middleware/requireAuthMiddleware'
import { formatCurrency, makeRequestOne, toDate } from '../../../../config/config'
import { LOCAL_STORAGE_KEYS, URLS } from '../../../../config/constants'
import { Anchor, Box, Button, ColorSwatch, Container, Group, RingProgress, Stack, Text, Title } from '@mantine/core'
import RenderCashAdvanceForm from '../../../../components/invoice/render_forms/RenderCashAdvanceForm'
import { DataTable } from 'mantine-datatable'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons'
import { getColor, getTooltip } from '../../../../config/functions'
import customRedirect from '../../../../middleware/redirectIfNoAuth'
import { useAppContext } from '../../../../providers/appProvider'


const CustomRingProgress = ({ level }: { level: number }) => {
  const color = getColor(level)
  const tip = getTooltip(level)
  return (
    <RingProgress
      size={80}
      thickness={8}
      label={
        <Text size="xs" align="center">
          {level * 25}%
        </Text>
      }
      sections={[
        { value: 100, color: color, tooltip: tip },
      ]}
    />
  )
}

const CashAdvanceFormTable = ({ records }: { records: any }) => {
  return (
    <DataTable
      minHeight={150}
      records={records ?? []}
      columns={[
        {
          accessor: 'id',
          title: '#',
          width: 36,
          render: (entry: any, i: number) => (
            <Group spacing={4}>
              <ColorSwatch color={getColor(entry?.level)} size={20} radius="xs" />
              <Text weight={600} size="sm">{i + 1}</Text>
            </Group>
          )
        },
        {
          accessor: 'requested_by.user.full_name',
          title: 'Requested By',
          width: 80,
          render: (entry: any) => (
            <Anchor component={Link} href={`/account/forms/cash-advance-forms/view/${entry?.id}/`}>
              <Text>{entry.requested_by?.user?.full_name}</Text>
            </Anchor>
          )
        },
        {
          accessor: 'project.name',
          title: 'Project',
          width: 80,
          render: (entry: any) => (
            <>
              <Text weight={600} size="sm">{entry?.project?.name}</Text>
              <Text weight={400} size="xs">{entry?.project?.code}</Text>
            </>
          )
        },
        {
          accessor: 'invoice_number',
          title: 'Invoice No.',
          width: 60,
        },
        {
          accessor: 'level',
          title: 'Progress',
          width: 80,
          render: (entry: any) => (
            <CustomRingProgress level={entry?.level} />
          )
        },
        {
          accessor: 'total',
          title: 'Amount',
          width: 80,
          render: (entry: any) => (
            <>
              <Text weight={600} size="sm" style={{ textTransform: "uppercase" }}>{`${entry?.currency} ${formatCurrency(entry?.total)}`}</Text>
            </>
          )
        },
        {
          accessor: 'created_on',
          title: 'Requested On',
          width: 110,
          render: (entry: any) => (
            <>
              <Text size="sm">{toDate(entry?.created_on, true)}</Text>
            </>
          )
        },
      ]}
      verticalSpacing={"sm"}

    />
  )
}

interface IMyForms {
  my_cash_advance_forms: any
  cash_advance_forms_to_check: any
  cash_advance_forms_to_approve: any
  userId: any
}

const MyForms = (props: IMyForms) => {
  const { my_cash_advance_forms, cash_advance_forms_to_check, userId, cash_advance_forms_to_approve } = props

  const [user_, setUser] = useState()
  const { user } = useAppContext()
  useEffect(() => {
    const u = JSON.parse(user ?? "null")
    console.log("User", u)
    setUser(u)
  }, [])

  return (
    <div>
      <Container size="lg" py={50}>
        <Box mb={"lg"}>
          <Anchor component={Link} href={'/account/forms'}>
            <Button size="lg" radius="md" leftIcon={<IconArrowLeft />}>
              Go to Forms
            </Button>
          </Anchor>
        </Box>
        <Stack>
          <Title>My Cash Advance Forms</Title>
          <CashAdvanceFormTable records={my_cash_advance_forms} />
        </Stack>

        {
          user ? user?.profile?.checker ? (
            <Stack>
              <Title>Cash Advance Forms to Check</Title>
              <CashAdvanceFormTable records={cash_advance_forms_to_check} />
            </Stack>
          ) : null : null
        }

        {
          user ? user?.profile?.approver ? (
            <Stack>
              <Title>Cash Advance Forms to Approve</Title>
              <CashAdvanceFormTable records={cash_advance_forms_to_approve} />
            </Stack>
          ) : null : null
        }


      </Container>
    </div>
  )
}


export const getServerSideProps = async (context: any) => {
  requireAuthMiddleware(context.req, context.res, () => { })

  const cookies = context.req.cookies
  // const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.user]
  const token = cookies[LOCAL_STORAGE_KEYS.token]
  const user_id = cookies[LOCAL_STORAGE_KEYS.user_id]

  const cash_advance_forms_query_to_check = await makeRequestOne({
    url: URLS.CASH_ADVANCE_FORMS,
    method: "GET",
    extra_headers: {
      authorization: `Bearer ${token}`
    },
    params: {
      checker__id: user_id,
      limit: 100,
      fields: "id,currency,requested_by,user,full_name,level,invoice_number,project,code,name,total,created_on"
    }
  })

  const cash_advance_forms_query_to_approve = await makeRequestOne({
    url: URLS.CASH_ADVANCE_FORMS,
    method: "GET",
    extra_headers: {
      authorization: `Bearer ${token}`
    },
    params: {
      approver__id: user_id,
      limit: 100,
      fields: "id,currency,requested_by,user,full_name,level,invoice_number,project,code,name,total,created_on"
    }
  })

  const my_cash_advance_forms_query = await makeRequestOne({
    url: URLS.CASH_ADVANCE_FORMS,
    method: "GET",
    extra_headers: {
      authorization: `Bearer ${token}`
    },
    params: {
      requested_by__user__id: user_id,
      limit: 100,
      fields: "id,currency,requested_by,user,full_name,level,invoice_number,project,code,name,total,created_on"
    }
  })


  return Promise.allSettled([my_cash_advance_forms_query, cash_advance_forms_query_to_check, cash_advance_forms_query_to_approve]).then((res) => {
    const res_0: any = res[0]
    const res_1: any = res[1]
    const res_2: any = res[2]

    if (res_0?.status === 'rejected') {
      customRedirect(context.req, context.res)
    }
    return {
      props: {
        my_cash_advance_forms: res_0?.value?.data.results,
        cash_advance_forms_to_check: res_1?.value?.data.results,
        cash_advance_forms_to_approve: res_2?.value?.data?.results,
        userId: parseInt(user_id || '0')
      }
    }
  })

}

MyForms.PageLayout = HeaderAndFooterWrapper
export default MyForms