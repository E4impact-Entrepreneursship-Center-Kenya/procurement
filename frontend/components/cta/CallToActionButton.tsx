import { Anchor, Button, useMantineTheme } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { PRIMARY_SHADE } from '../../config/constants'

interface CallToActionButtonProps {
    label: string
    icon: React.ReactElement
    link?: string
    action?: any
    type?: 'submit' | 'reset' | 'button',
    rightIcon? : React.ReactElement
}

export const CallToActionButton = (props: CallToActionButtonProps) => {
    const { label, icon, link } = props
    const theme = useMantineTheme()

    return (
        <Anchor component={Link} href={link ?? "/"} passHref>
            <Button sx={{
                background: PRIMARY_SHADE[2],
                color: theme.white,
                height: "40px",
                minWidth: "200px",
                ":hover": {
                    background: `${PRIMARY_SHADE[2]} !important`,
                }
            }} radius="xl" leftIcon={icon}>
                {label}
            </Button>
        </Anchor>
    )
}

export const CallToActionButtonAction = (props: CallToActionButtonProps) => {
    const { label, icon, action, type, rightIcon } = props
    const theme = useMantineTheme()
    const voidFunc = () => {}
    return (
        <Button sx={{
            background: PRIMARY_SHADE[2],
            color: theme.white,
            height: "40px",
            minWidth: "200px",
            ":hover": {
                background: `${PRIMARY_SHADE[2]} !important`,
            }
        }} radius="xl" type={type} leftIcon={icon} onClick={action ?? voidFunc} rightIcon={rightIcon ? rightIcon : null}>
            {label}
        </Button>
    )
}

export default CallToActionButton