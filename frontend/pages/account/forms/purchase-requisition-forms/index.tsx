import React, { useEffect, useState } from 'react'
import HeaderAndFooterWrapper from '../../../../layouts/HeaderAndFooterWrapper'
import requireAuthMiddleware from '../../../../middleware/requireAuthMiddleware'
import { formatCurrency, makeRequestOne, toDate } from '../../../../config/config'
import { LOCAL_STORAGE_KEYS, URLS } from '../../../../config/constants'
import { Anchor, Box, Button, ColorSwatch, Container, Group, RingProgress, Stack, Text, Title } from '@mantine/core'
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

const PurchaseRequisitionTable = ({ records }: { records: any }) => {
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
            <Anchor component={Link} href={`/account/forms/purchase-requisition-forms/view/${entry?.id}/`}>
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
  my_forms: any
  forms_to_approve: any
  forms_to_verify: any
  forms_to_confirm: any
  userId: any
}

const PurchaseRequisitionForms = (props: IMyForms) => {
  const { my_forms, forms_to_approve, forms_to_verify, forms_to_confirm, userId } = props

  const [user_, setUser] = useState<any>(null)
  const { user } = useAppContext()
  useEffect(() => {
    const u = JSON.parse(user ?? "null")
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
          <Title>My Purchase Requisition Forms</Title>
          <PurchaseRequisitionTable records={my_forms} />
        </Stack>

        {
          forms_to_approve?.length > 0 ? (
            <Stack>
              <Title>Purchase Requisition Forms to Approve</Title>
              <PurchaseRequisitionTable records={forms_to_approve} />
            </Stack>
          ) : null
        }

        {
          user_ ? user_?.profile?.can_verify_purchases ? (
            <Stack>
              <Title>Purchase Requisition Forms to Verify</Title>
              <PurchaseRequisitionTable records={forms_to_verify} />
            </Stack>
          ) : null : null
        }

        {
          user_ ? user_?.profile?.is_finance_officer ? (
            <Stack>
              <Title>Purchase Requisition Forms to Confirm</Title>
              <PurchaseRequisitionTable records={forms_to_confirm} />
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

  const forms_to_verify_query = await makeRequestOne({
    url: URLS.PURCHASE_REQUISITION_FORMS,
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

  const forms_to_confirm_query = await makeRequestOne({
    url: URLS.PURCHASE_REQUISITION_FORMS,
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

  const forms_to_approve_query = await makeRequestOne({
    url: URLS.PURCHASE_REQUISITION_FORMS,
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

  const my_forms_query = await makeRequestOne({
    url: URLS.PURCHASE_REQUISITION_FORMS,
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


  return Promise.allSettled([my_forms_query, forms_to_approve_query, forms_to_verify_query, forms_to_confirm_query]).then((res) => {
    const res_0: any = res[0]
    const res_1: any = res[1]
    const res_2: any = res[2]
    const res_3: any = res[3]

    if (res_0?.status === 'rejected') {
      customRedirect(context.req, context.res)
    }
    return {
      props: {
        my_forms: res_0?.value?.data.results,
        forms_to_approve: res_1?.value?.data?.results,
        forms_to_verify: res_2?.value?.data.results,
        forms_to_confirm: res_3?.value?.data.results,
        userId: parseInt(user_id || '0')
      }
    }
  })

}

PurchaseRequisitionForms.PageLayout = HeaderAndFooterWrapper
export default PurchaseRequisitionForms