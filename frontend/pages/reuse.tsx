import Head from 'next/head'
import React from 'react'
import { Container } from '@mantine/core'
import CustomHeading from '../components/navigations/CustomHeading'
import { APP_NAME, SEPARATOR } from '../config/constants'
import HeaderAndFooterWrapper from '../layouts/HeaderAndFooterWrapper'

const PurchaseRequest = () => {
    return (
        <div>
            <Head>
                <title>{`${APP_NAME} ${SEPARATOR} Purchase Request`}</title>
            </Head>
            <CustomHeading title="Purchase Requesition Form" />
            <Container size="md" mt={20}>
                [IN DEVELOPMENT]
            </Container>
        </div>
    )
}

PurchaseRequest.PageLayout = HeaderAndFooterWrapper
export default PurchaseRequest