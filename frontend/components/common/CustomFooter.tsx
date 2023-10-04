import React from 'react'
import { Anchor, Box, ActionIcon, Center, Container, Divider, Grid, Group, Image, List, Stack, Text, Title } from '@mantine/core';
import { PRIMARY_SHADE, BLUE_DARK_COLOR, APP_NAME, LINK_WEIGHT } from '../../config/constants';
import publicStyles from '../../styles/publicStyles';
import { getTheme } from '../../config/config';
import Link from 'next/link';
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandWhatsapp, IconMessage, IconPhoneCall, IconMail, IconMailFast } from '@tabler/icons';
import { IconChevronRight } from '@tabler/icons';

interface ServiceProps {
  title: string,
  href: string,
  icon?: React.ReactElement
}

const Service = (props: ServiceProps) => {
  const { title, href, icon } = props
  return (
    <List.Item icon={icon}>
      <Anchor href={href} component={Link} style={{
        textDecoration: "none"
      }} weight={LINK_WEIGHT}>
        <Text color="white" size="sm">{title}</Text>
      </Anchor>
    </List.Item >
  )
}

const services: ServiceProps[] = [
  {
    title: "Service One",
    href: "/",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Serivce Two ",
    href: "/",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Service Three",
    href: "/",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Service Four ",
    href: "/",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
]

const contacts: ServiceProps[] = [
  {
    title: "+254742407266",
    href: "tel:+254742407266",
    icon: <IconPhoneCall color="white" stroke={1.5} />
  },
  {
    title: "sms +254742407266",
    href: "sms:+254742407266",
    icon: <IconMessage color="white" stroke={1.5} />
  },
  {
    title: "+254742407266",
    href: "https://wa.link/nxwlz1",
    icon: <IconBrandWhatsapp color="white" stroke={1.5} />
  },
  {
    title: "info@livesoftwaredeveloper.com",
    href: "mailto:info@livesoftwaredeveloper.com",
    icon: <IconMailFast color="white" stroke={1.5} />
  },
]

const support: ServiceProps[] = [
  {
    title: "Our Blog",
    href: "/articles",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Raise Support Ticket",
    href: "https://hosting.livesoftwaredeveloper.com/submitticket.php?step=2&deptid=1",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Request Service",
    href: "/contact-us",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Live Chat",
    href: "#",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
]



const quickLinks: ServiceProps[] = [
  {
    title: "Link One",
    href: "/",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Link Two",
    href: "/",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Link Three ",
    href: "/",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Link Four",
    href: "/",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
  {
    title: "Link Five",
    href: "/",
    icon: <IconChevronRight color="white" stroke={1.5} />
  },
]

const CustomFooter = () => {
  const { classes, theme } = publicStyles()
  const textSize = "sm"
  return (
    <Box pt={50} sx={{
      // background: "rgb(20, 87, 230)",
      background: getTheme(theme) ? BLUE_DARK_COLOR : PRIMARY_SHADE[2],
      color: theme.white
    }}>
      <Stack spacing={0}>

        <Box>
          <Container py={16} size="lg">
            <Grid >
              <Grid.Col md={3} sm={12}>
                <Stack spacing="md">
                  <img src={getTheme(theme) ? '/logo_PRIMARY_SHADE.png' : '/logo_black_small.png'} className={classes.footerImage} />
                  <Text>
                  Lorem Ipsum Dolor Teaser Message!
                  </Text>
                  <List spacing="xs">
                    {contacts.map((service: ServiceProps, i: number) => (
                      <Service key={`contacts_${i}`} {...service} />
                    ))}
                  </List>
                  <Group>
                    <Anchor href='#' style={{
                      textDecoration: "none"
                    }}>
                      <ActionIcon size={48} radius="md" variant="light" color="violet">
                        <IconBrandFacebook stroke={1.5} />
                      </ActionIcon>
                    </Anchor>
                    <Anchor href='#' style={{
                      textDecoration: "none"
                    }}>
                      <ActionIcon size={48} radius="md" variant="light" color="violet">
                        <IconBrandLinkedin stroke={1.5} />
                      </ActionIcon>
                    </Anchor>
                    <Anchor href='#' style={{
                      textDecoration: "none"
                    }}>
                      <ActionIcon size={48} radius="md" variant="light" color="violet">
                        <IconBrandInstagram stroke={1.5} />
                      </ActionIcon>
                    </Anchor>
                    <Anchor href='#' style={{
                      textDecoration: "none"
                    }}>
                      <ActionIcon size={48} radius="md" variant="light" color="violet">
                        <IconBrandTwitter stroke={1.5} />
                      </ActionIcon>
                    </Anchor>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col md={3} sm={12}>
                <Stack spacing="md">
                  <Title order={5}>Services</Title>
                  <List>
                    {services.map((service: ServiceProps, i: number) => (
                      <Service key={`service_one_${i}`} {...service} />
                    ))}
                  </List>
                </Stack>
              </Grid.Col>
              <Grid.Col md={3} sm={12}>
                <Stack spacing="md">
                  <Title order={5}>Quick Links</Title>
                  <List>
                    {quickLinks.map((service: ServiceProps, i: number) => (
                      <Service key={`service_two_${i}`} {...service} />
                    ))}
                  </List>
                </Stack>
              </Grid.Col>
              <Grid.Col md={3} sm={12}>
                <Stack spacing="md">
                  <Title order={5}>Support</Title>
                  <List>
                    {support.map((service: ServiceProps, i: number) => (
                      <Service key={`service_one_${i}`} {...service} />
                    ))}
                  </List>
                </Stack>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        <Box py={16} sx={{
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: getTheme(theme) ? theme.colors.dark[2] : theme.colors.gray[2]
        }}>
          <Container size="lg">
            <Grid>
              <Grid.Col md={8} sm={12}>
                <Group align="center">
                  <Text weight={400}>Payments We Accept: </Text>
                  <Image src="https://img.icons8.com/color/48/null/visa.png" width="48px" />
                  <Image src="https://img.icons8.com/color/48/null/mastercard-logo.png" width="48px" />
                  <Image src="https://img.icons8.com/fluency/48/null/paypal.png" width="48px" />
                  <Box sx={{
                    background: "white",
                    borderRadius: theme.radius.md,
                    padding: "4px 8px"
                  }}>
                    <Image src="/mpesa.png" width="120px" />
                  </Box>
                </Group>
              </Grid.Col>
              <Grid.Col md={4} sm={12}>
                <Center className='h-100'>
                  <Group position="center">
                    <Anchor href='/' component={Link} style={{
                      textDecoration: "none"
                    }}>
                      <Text size="sm" color="white">Terms of Service</Text>
                    </Anchor>
                    <Divider orientation='vertical' color={getTheme(theme) ? theme.colors.dark[2] : theme.colors.gray[2]} />
                    <Anchor href='/' component={Link} style={{
                      textDecoration: "none"
                    }}>
                      <Text size="sm" color="white">Privacy Policy</Text>
                    </Anchor>
                  </Group>
                </Center>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        <Box py={16} sx={{
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: getTheme(theme) ? theme.colors.dark[2] : theme.colors.gray[2]
        }}>
          <Text size="sm" weight={300} align="center"> Copyright &copy; 2023 {APP_NAME}. Design by <Anchor href='https://livesoftwaredeveloper.com'>Live Software Developer</Anchor> </Text>
        </Box>

      </Stack>
    </Box>
  )
}

export default CustomFooter