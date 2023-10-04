import { Card, Stack, Grid, Title, Center, Anchor, Button, Group, Text } from '@mantine/core'
import { IconPhoneCalling } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { PRIMARY_SHADE } from '../../config/constants'
import publicStyles from '../../styles/publicStyles'
import { useMediaQuery } from '@mantine/hooks'

interface CallToActionProps {
    text: string
    title: string
    link: string
    buttonIcon: React.ReactElement
    buttonLabel: string
}

const CallToAction = (props: CallToActionProps) => {
    const { text, title, link, buttonIcon, buttonLabel } = props

    const { classes, theme } = publicStyles()
    const matches = useMediaQuery('(max-width: 992px)');

    return (
        <Card sx={{
            // background: PRIMARY_SHADE[2],
        }} 
        className={`position-relative ${classes.absolute1}`}
        p={50} radius="lg">
            <Stack spacing={15} style={{
                position: "relative",
                zIndex: 2,
            }}>
                <Grid>
                    <Grid.Col md={6}>
                        <Title order={3} color={theme.white} size={44} align={matches ? 'center' : 'start'}>{title}</Title>
                        <Text color={theme.white} align={matches ? 'center' : 'start'} style={{
                            whiteSpace: "pre-wrap",
                        }}>
                            {text}
                        </Text>
                    </Grid.Col>
                    <Grid.Col md={6} py="xl">
                        <Center className="h-100">
                            <Anchor component={Link} href={link} passHref>
                                <Button radius="xl" size="lg" sx={{
                                    background: theme.white,
                                    color: PRIMARY_SHADE[2],
                                    transform: "all 0.4s ease",
                                    ".call-icon": {
                                        display: "none"
                                    },
                                    ":hover": {
                                        background: "#fff !important",
                                        color: `${PRIMARY_SHADE[2]} !important`,
                                        boxShadow: "0 0 2px 0 #fff",
                                        ".call-icon": {
                                            display: "block"
                                        }
                                    }
                                }}>
                                    <Group>
                                        {buttonIcon}
                                        <span>{buttonLabel}</span>
                                    </Group>
                                </Button>
                            </Anchor>
                        </Center>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Card>
    )
}

export default CallToAction