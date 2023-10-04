import { ActionIcon, Card, Center, Grid, Stack, Text, Title, Avatar } from '@mantine/core'
import { IconServerBolt } from '@tabler/icons'
import React from 'react'
import publicStyles from '../../../styles/publicStyles'
import { getTheme, limitChars } from '../../../config/config';
import { BLUE_BG_COLOR, PRIMARY_SHADE } from '../../../config/constants';

export interface ServiceProps {
    title: string
    description: string
    link?: string
    icon?: string
    id?: string
    image?: string
}

const Service = (props: ServiceProps) => {
    const { icon, title, description } = props
    const { theme, classes } = publicStyles()

    return (
        <Card shadow="md" withBorder={false} radius="lg" p="xl" className='h-100'>
            <Stack spacing={10}>
                <Center>
                    <ActionIcon size={60} sx={{
                        background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[1],
                        borderRadius: theme.radius.md,
                    }}>
                        <Avatar src={icon} size={42} radius="md" />
                    </ActionIcon>
                </Center>
                <Title order={4} align='center' className={classes.color}>{title}</Title>
                <Text align='center' size="sm">
                    {limitChars(description, 120)}
                </Text>
            </Stack>
        </Card>
    )
}

// Give more details about the services we offer by explaining them in about 25 words
export const services: ServiceProps[] = [
    {
        id: 'web-hosting',
        icon: '',
        title: "Web Hosting",
        description: "We offer webhosting services to our clients. We have a wide range of hosting plans to choose from. We also offer free SSL certificates to our clients.",
        image: "/assets/services/webhosting.jpg",
        link: "/services/web-hosting"
    },
]

export function getService(id: string) {
    return services.find((service: ServiceProps) => service.id === id)
}

const OurServices = () => {
    return (
        <Grid>
            {
                services.map((service: ServiceProps, i: number) => (
                    <Grid.Col key={`service__${i}`} md={3} sm={6}>
                        <Service {...service} />
                    </Grid.Col>
                ))
            }
        </Grid>
    )
}

export default OurServices