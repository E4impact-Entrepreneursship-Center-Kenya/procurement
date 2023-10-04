import { Stack, Paper, Text } from '@mantine/core'
import React from 'react'
import { getTheme } from '../../config/config'

interface IApprovalsSection {
    children: any
}

const ApprovalsSection = ({ children }: IApprovalsSection) => {
    return (
        <Stack>
            <Paper p={4} sx={theme => ({
                border: `1px solid ${getTheme(theme) ? theme.colors.dark[3] : theme.colors.gray[2]}`
            })}>
                <Text align="center" color='green' weight={600} size={'md'}>APPROVALS</Text>
            </Paper>
            <Paper p={10} sx={theme => ({
                border: `2px solid ${getTheme(theme) ? theme.colors.dark[3] : theme.colors.gray[2]}`
            })}>
                {children}
            </Paper>
        </Stack>
    )
}

export default ApprovalsSection