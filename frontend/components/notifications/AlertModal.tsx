import { BackgroundImage, Stack, Text, Title } from '@mantine/core'
import React from 'react'

interface AlertModalProps {
    title: string,
    text: string
}

const AlertModal = (props: AlertModalProps) => {
    const {title, text} = props
    return (
        <BackgroundImage opacity={0.9} src='/images/congrats.png' >
            <Stack p={50}>
                <Title align='center'>{title}</Title>
                <Text align='center' size={"xl"}>
                    🎉🎉🎉
                </Text>
                <Title order={3} weight={500} align="center" px={40}>
                    {text}
                </Title>
            </Stack>
        </BackgroundImage>
    )
}

export default AlertModal