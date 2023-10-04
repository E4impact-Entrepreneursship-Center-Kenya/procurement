import Head from 'next/head'
import React from 'react'
import { APP_NAME, SEPARATOR } from '../../config/constants'
import { Card, Container, Stack } from '@mantine/core'
import CustomHeading from '../../components/navigations/CustomHeading'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import InvoiceFooter from '../../components/invoice/InvoiceFooter'
import InvoiceHeader from '../../components/invoice/InvoiceHeader'
import { getTheme } from '../../config/config'

const Reimbursement = () => {
    return (
        <div>
            <Head>
                <title>{`${APP_NAME} ${SEPARATOR} Claim Form`}</title>
            </Head>
            <CustomHeading title="Claim Form" />
            <Container size="md" mt={20}>
            <Card radius="md" sx={theme => ({
                    background: getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0]
                })}>
                    <Stack spacing={20}>
                        <InvoiceHeader />
                        [IN DEVELOPMENT]
                        <InvoiceFooter />
                    </Stack>
                </Card>
            </Container>
        </div>
    )
}

Reimbursement.PageLayout = HeaderAndFooterWrapper
export default Reimbursement