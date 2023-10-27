import React from 'react'
import HeaderAndFooterWrapper from '../../../layouts/HeaderAndFooterWrapper'
import requireAuthMiddleware from '../../../middleware/requireAuthMiddleware'
import { Container, Grid, Stack, Title } from '@mantine/core'
import { IInvoice, InvoiceCard } from '../../index'
import { LOCAL_STORAGE_KEYS } from '../../../config/constants'


const invoices: IInvoice[] = [
  {
    title: "Cash Advance",
    href: "/account/forms/cash-advance-forms",
    icon: 'https://img.icons8.com/carbon-copy/100/40C057/invoice.png'
  },
  {
    title: "Expense Claim",
    href: "/account/forms/expense-claim-forms",
    icon: 'https://img.icons8.com/carbon-copy/100/40C057/invoice.png'
  },
  {
    title: "Purchase Requisition",
    href: "/account/forms/purchase-requisition-forms",
    icon: 'https://img.icons8.com/carbon-copy/100/40C057/invoice.png'
  },
  {
    title: "Request For Quotation",
    href: "/account/forms/request-for-quotation-forms",
    icon: 'https://img.icons8.com/carbon-copy/100/40C057/invoice.png'
  },
  {
    title: "Local Purchase Order",
    href: "/account/forms/local-purchase-order-forms",
    icon: 'https://img.icons8.com/carbon-copy/100/40C057/invoice.png'
  },
  {
    title: "Over Expenditure Form",
    href: "/account/forms/over-expenditure-forms",
    icon: 'https://img.icons8.com/carbon-copy/100/40C057/invoice.png'
  },
  {
    title: "Under Expenditure Form",
    href: "/account/forms/under-expenditure-forms",
    icon: 'https://img.icons8.com/carbon-copy/100/40C057/invoice.png'
  },
]

interface IMyForms {
  userId: any
}

const MyForms = (props: IMyForms) => {


  return (
    <div>
      <Container size="lg" py={50}>
      <Stack spacing={40}>
          <Title align="center">View Forms Associated with You</Title>
          <Grid>
            {
              invoices.map((invoice: IInvoice, i: number) => (
                <Grid.Col key={`invoice_card_${i}`} md={4}>
                  <InvoiceCard {...invoice} />
                </Grid.Col>
              ))
            }
          </Grid>
        </Stack>
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

  return {
    props: {
    }
  }
}

MyForms.PageLayout = HeaderAndFooterWrapper
export default MyForms