import { Group, TextInput, Title } from '@mantine/core'
import React from 'react'

interface IFormTitle {
  title: string
  invoice_number?: any
}

const FormTitle = ({ title, invoice_number }: IFormTitle) => {
  return (
    <Group align='center' position='center'>
      <Title order={1} mb="xs" align='center' weight={600}>{title}</Title>
      <TextInput disabled value={invoice_number} maw={150} />
    </Group>
  )
}

export default FormTitle