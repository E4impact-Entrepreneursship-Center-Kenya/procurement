import { Container, Paper, Title } from '@mantine/core'
import React from 'react'
import { getTheme } from '../../config/config'

interface ICustomHeading {
    title: String
}

const CustomHeading = ({ title }: ICustomHeading) => {
    return (
        <Paper sx={theme => ({
            background: getTheme(theme) ? theme.colors.dark[8] : theme.colors.gray[1]
        })} py={60}>
            <Container size={"md"}>
                <Title>{title}</Title>
            </Container>
        </Paper>
    )
}

export default CustomHeading