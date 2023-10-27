import { Container, Title, Grid, Card, Image, Stack, Anchor } from "@mantine/core";
import HeaderAndFooterWrapper from "../layouts/HeaderAndFooterWrapper";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";
import Link from "next/link";
import { getTheme } from "../config/config";
import { WEBSITE_LOGO } from "../config/constants";

export interface IInvoice {
  title: string
  href: string
  icon: string
}

export const InvoiceCard = ({ title, href, icon }: IInvoice) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Card radius="md" sx={theme => ({
        background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[0],
        border: '2px solid transparent',
        ':hover': {
          border: `2px solid ${theme.primaryColor}`
        }
      })}>
        <Image src={icon} mx={'auto'} width={66} alt={title} />
        <Title order={3} weight={400} align="center" mt={'md'}>{title}</Title>
      </Card>
    </Link>
  )
}

export const LinkCard = ({ title, href, icon }: IInvoice) => {
  return (
    <Anchor href={href} style={{ textDecoration: "none", width: "100%", height: "100%", display: "block" }} target="_blank">
      <Card radius="md" sx={theme => ({
        background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[0],
        border: '2px solid transparent',
        height: "100%",
        ':hover': {
          border: `2px solid ${theme.primaryColor}`
        }
      })}>
        <Image src={icon} mx={'auto'} width={66} alt={title} />
        <Title order={3} weight={400} align="center" mt={'md'}>{title}</Title>
      </Card>
    </Anchor>
  )
}


const invoices: IInvoice[] = [
  {
    title: "Cash Advance",
    href: "/invoices/cash-advance",
    icon: 'https://img.icons8.com/carbon-copy/100/40C057/cash-register.png'
  },
  {
    title: "Expense Claim Form",
    href: "/invoices/expense-claim-form",
    icon: 'https://img.icons8.com/dotty/80/40C057/delete-receipt.png'
  },
  {
    title: "Purchase Requisition",
    href: "/invoices/purchase-requisition",
    icon: 'https://img.icons8.com/dotty/80/40C057/shopping-cart-with-money.png'
  },
  {
    title: "Request For Quotation",
    href: "/invoices/request-for-quotation",
    icon: 'https://img.icons8.com/carbon-copy/100/40C057/invoice.png'
  },
  // {
  //   title: "Payment Authorization",
  //   href: "/invoices/payment-authorization-form",
  //   icon: 'https://img.icons8.com/wired/64/40C057/card-in-use.png'
  // },
  {
    title: "Local Purchase Order",
    href: "/invoices/local-purchase-order",
    icon: 'https://img.icons8.com/dotty/80/40C057/purchase-order.png'
  },
  {
    title: "Over Expenditure Form",
    href: "/invoices/over-expenditure-form",
    icon: 'https://img.icons8.com/wired/64/40C057/estimate.png'
  },
  {
    title: "Under Expenditure Form",
    href: "/invoices/under-expenditure-form",
    icon: 'https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/40C057/external-accounting-accounting-smashingstocks-detailed-outline-smashing-stocks-3.png'
  },
]


interface IIndexPage {

}

function IndexPage(props: IIndexPage) {

  return (
    <div>
      <Container py={50} size="lg">
        <Stack spacing={40}>
          <Title align="center">PROCUREMENT</Title>
          <Grid>
            {
              invoices.map((invoice: IInvoice, i: number) => (
                <Grid.Col key={`invoice_card_${i}`} md={4}>
                  <InvoiceCard {...invoice} />
                </Grid.Col>
              ))
            }
            <Grid.Col md={4}>
              <LinkCard title="Procurement Policies & Procudures" key={'e4i-prod-manuel'} href="/docs/proc-policy.pdf" icon={WEBSITE_LOGO} />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}


export const getServerSideProps = async (context: any) => {
  requireAuthMiddleware(context.req, context.res, () => { })

  return {
    props: {

    }
  }
}


IndexPage.PageLayout = HeaderAndFooterWrapper;

export default IndexPage;