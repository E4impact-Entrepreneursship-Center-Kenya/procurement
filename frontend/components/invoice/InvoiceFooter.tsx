import { Text } from '@mantine/core'
import React from 'react'

const InvoiceFooter = () => {
  return (
    <div>
        <Text size="sm" align='center'>
            Milan Office: ALTIS Via San Vittore, Milan - Italy; Email: <a href='mailto:info@4impact.org'>info@4impact.org</a>; 
            Tel: <a href="tel:+390272348383">+39 02 7234 8383</a>
        </Text>
        <Text size="sm" align='center'>
            East African Office: Email <a href='mailto:accelerator.kenya@4impact.org'>accelerator.kenya@4impact.org</a>; 
            Tel: <a href="tel:+254712526952">+254 712 526 952</a>
        </Text>
    </div>
  )
}

export default InvoiceFooter