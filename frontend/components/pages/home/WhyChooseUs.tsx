import { ActionIcon, Avatar, Card, Center, Grid, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { getTheme } from '../../../config/config'
import { BLUE_BG_COLOR, BLUE_DARK_COLOR } from '../../../config/constants'
import publicStyles from '../../../styles/publicStyles'

interface ReasonProps {
    title: string,
    description: string,
    image?: string,
}

const reasons: ReasonProps[] = [
    {
        title: "Proven Track Record",
        description: "We have a proven track record of delivering exceptional software solutions and hosting services to clients across a variety of industries.",
        image: "https://img.icons8.com/dotty/80/e54813/best-seller.png",
    },
]

const Reason = (props: ReasonProps) => {
    const { title, description, image } = props
    const { classes, theme } = publicStyles()

    return (
        <>
            <Card p={20} className="h-100" radius="lg" sx={theme => ({
                background: getTheme(theme) ? BLUE_DARK_COLOR : BLUE_BG_COLOR,
            })}>
                <Stack spacing="xs" align="center">
                    <Center className="h-100 w-100">
                        <ActionIcon size={60} sx={{
                            background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[1],
                            borderRadius: theme.radius.md,
                        }}>
                            <Avatar src={image} size={42} radius="md" />
                        </ActionIcon>
                    </Center>
                    <Title order={4} align="center" className={classes.color}>{title}</Title>
                    <Text align="center" size="sm">{description}</Text>
                </Stack>
            </Card>
        </>
    )
}

const WhyChooseUs = () => {
    return (
        <>
            <Stack spacing="sm">
                <Text align='justify'>
                    At Live Software Developer, we prioritize innovation, quality, and customer satisfaction in everything we do. Our team of expert developers and technicians are dedicated to providing cutting-edge software solutions and reliable hosting services tailored to your specific needs. We pride ourselves on our exceptional customer service, attention to detail, and commitment to staying ahead of the curve in the constantly evolving digital landscape. Choose us to bring your vision to life with the latest in software development and hosting services.
                </Text>
                <Grid>
                    {reasons.map((reason: ReasonProps, i: number) => (
                        <Grid.Col key={`why_choose_us_${i}`} md={3} sm={6}>
                            <Reason {...reason} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Stack>
        </>
    )
}

export default WhyChooseUs