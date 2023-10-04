import React, { useRef } from 'react'
import HeaderAndFooterWrapper from '../../../../../layouts/HeaderAndFooterWrapper'
import { makeRequestOne } from '../../../../../config/config'
import { LOCAL_STORAGE_KEYS, URLS } from '../../../../../config/constants'
import requireAuthMiddleware from '../../../../../middleware/requireAuthMiddleware'
import { Button, Container, Progress, Stack } from '@mantine/core'
import RenderCashAdvanceForm from '../../../../../components/invoice/render_forms/RenderCashAdvanceForm'
import { getColor, getTooltip } from '../../../../../config/functions'
import ReactToPrint from 'react-to-print';
import { IconPrinter } from '@tabler/icons'
import Head from 'next/head'

interface ISingleForm {
    form: any
    userId: any
}

const SingleForm = ({ form, userId }: ISingleForm) => {
    const color = getColor(form?.level)
    const tip = getTooltip(form?.level)
    const componentRef = useRef(null);
    return (
        <div>
            <Head>
                <title>{`Cash Advance Form ${form?.invoice_number}`}</title>
            </Head>
            <Container py={40} size="lg">
                <Stack>
                    <Progress size="xl" striped animate={form?.level !== 4} sections={[
                        { value: form?.level * 25, color: color, label: `Progress ${form?.level * 25}%`, tooltip: tip }]} />
                    <RenderCashAdvanceForm form={form} userId={userId} ref={componentRef} />

                    <ReactToPrint
                        trigger={() => <Button size="lg" radius="md" variant='filled' mb="md" leftIcon={<IconPrinter />}>Print/Download</Button>}
                        content={() => componentRef?.current}
                    />
                </Stack>
            </Container>
        </div>
    )
}




export const getServerSideProps = async (context: any) => {
    requireAuthMiddleware(context.req, context.res, () => { })
    const { params } = context
    const cookies = context.req.cookies
    // const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.user]
    const token = cookies[LOCAL_STORAGE_KEYS.token]
    const user_id = cookies[LOCAL_STORAGE_KEYS.user_id]


    const formQuery = await makeRequestOne({
        url: `${URLS.CASH_ADVANCE_FORMS}/${params?.id}`,
        method: "GET",
        extra_headers: {
            authorization: `Bearer ${token}`
        },
        params: {
            fields: "id,country,currency,requested_by,full_name,checker,user,signature,date,amount,receipt,checked_by,approver,approved_by,amount_received,name,level,invoice_number,bank_batch_no,purpose,project,code,name,activity_end_date,expected_liquidation_date,items,total,is_completed"
        }
    })


    return {
        props: {
            form: formQuery?.data,
            userId: parseInt(user_id || '0')
        }
    }

}

SingleForm.PageLayout = HeaderAndFooterWrapper
export default SingleForm