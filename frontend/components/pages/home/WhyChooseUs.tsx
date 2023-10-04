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
        title: "24/7 Server Uptime",
        description: "We understand the importance of keeping your website or application up and running, which is why we offer a guaranteed 99.9% server uptime for all our hosting services.",
        image: "https://img.icons8.com/external-phatplus-lineal-phatplus/64/e54813/external-24-hours-convenience-online-phatplus-lineal-phatplus.png",

    },
    {
        title: "Expert Development Team",
        description: "Our team of expert developers has years of experience in delivering cutting-edge software solutions tailored to our clients' specific needs.",
        image: "https://img.icons8.com/external-wanicon-lineal-wanicon/64/e54813/external-expert-training-and-coaching-wanicon-lineal-wanicon.png",
    },
    {
        title: "Affordable Pricing",
        description: "We offer affordable pricing for all our services without compromising on quality. Our pricing is transparent, so you know exactly what you're paying for.",
        image: "https://img.icons8.com/external-icongeek26-outline-icongeek26/64/e54813/external-save-currency-icongeek26-outline-icongeek26-1.png",
    },
    {
        title: "Exceptional Customer Service",
        description: "We pride ourselves on our exceptional customer service. Our support team is available 24/7 to help you with any questions or issues you may have.",
        image: "https://img.icons8.com/external-becris-lineal-becris/64/e54813/external-customer-service-data-science-becris-lineal-becris.png",
    },
    {
        title: "Cutting-Edge Technology",
        description: "We stay ahead of the curve in the constantly evolving digital landscape, using the latest technology to deliver innovative software solutions and hosting services.",
        image: "https://img.icons8.com/dotty/80/e54813/processor.png",
    },
    {
        title: "Customized Solutions",
        description: "We understand that every business has unique needs, which is why we offer customized software solutions and hosting services tailored to your specific requirements.",
        image: "https://img.icons8.com/dotty/80/e54813/idea-sharing.png",
    },
    {
        title: "Trustworthy and Secure",
        description: "We take security seriously and implement the latest security measures to ensure that your data is safe and secure.",
        image: "https://img.icons8.com/ios/50/e54813/ability-to-handle-surprises.png",
    },
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