import React, { useState } from 'react'
import { Anchor, Box, Card, Container, Grid, Group, Stack, Text, TextInput, Title, Center, Image, LoadingOverlay } from '@mantine/core'
import { IconAlertOctagon, IconAlertTriangle, IconMail, IconPassword, IconAlertCircle } from '@tabler/icons'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import publicStyles from '../../../styles/publicStyles'
import { CallToActionButtonAction } from '../../../components/cta/CallToActionButton'
import HeaderAndFooterWrapper from '../../../layouts/HeaderAndFooterWrapper'
import { RequestProps, getTheme, makeRequestOne } from '../../../config/config'
import { LOCAL_STORAGE_KEYS, URLS, WEBSITE_LOGO } from '../../../config/constants'
import { displayErrors } from '../../../config/functions'

const Reset = (props: any) => {
  const { loginStatus } = props
  const [loading, setLoading] = useState<boolean>(false)


  const { classes, theme } = publicStyles()
  const router = useRouter()

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => value === '' ? 'Email is required' : null,
    }
  })

  const handlePasswordReset = () => {
    const options: RequestProps = {
      url: `${URLS.REQUEST_PASSWORD_RESET}`,
      method: 'POST',
      extra_headers: {},
      data: { ...form.values },
      params: {},
      useNext: true,
    }
    setLoading(true)
    makeRequestOne(options).then((res: any) => {
      showNotification({
        title: 'Success',
        message: "An email has been sent with further instructions to reset your password.",
        color: 'green',
        icon: <IconAlertCircle stroke={1.5} />,
      })
      form.reset()
    }).catch((error) => {
      const errors = error?.response?.data
      displayErrors(form, errors)
      showNotification({
        title: 'Error',
        message: "An error occurred. Please try again",
        color: 'red',
        icon: <IconAlertTriangle stroke={1.5} />,
      })
    }).finally(() => {
      setLoading(false)
    })
  }

  React.useEffect(() => {
    if (loginStatus) {
      showNotification({
        title: 'You are Authenticated',
        message: "You are already logged in",
        color: 'yellow',
        icon: <IconAlertOctagon stroke={1.5} />,
      })
      router.push('/')
    }
  }, [])

  return (
    <>
      <Box>
        <Container size={"xs"} py={50}>

          <Card radius="lg" p={50} style={{
            background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[0],
            position: "relative"
          }}>
            <LoadingOverlay visible={loading} />
            <Stack>
              <Center>
                <Image src={WEBSITE_LOGO} radius="md" className={classes.image} width={200} />
              </Center>
              <Title className={classes.title2} align='center'>Reset Password</Title>
              <Text align='center'>Please fill in the form below to reset your password</Text>
              <form onSubmit={form.onSubmit((values) => handlePasswordReset())}>
                <Grid>
                  <Grid.Col>
                    <TextInput
                      label="Email"
                      placeholder='Enter your email'
                      type="email"
                      radius="md"
                      icon={<IconMail stroke={1.5} />}
                      autoFocus={true}
                      {...form.getInputProps('email')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Stack align='center' spacing={16}>
                      <CallToActionButtonAction label={'Request Password Reset'} type='submit' icon={<IconPassword stroke={1.5} color='white' />} />
                      <Group spacing={4} p={0}>
                        <Text size="sm">
                          Remember your password?
                        </Text>
                        <Anchor component={Link} href="/auth/login" size="sm">
                          Sign In
                        </Anchor>
                      </Group>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </form>
            </Stack>
          </Card>
        </Container>
      </Box>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const status = getCookie(LOCAL_STORAGE_KEYS.login_status, context)

  return {
    props: {
      loginStatus: status ? status : false,
    },
  }
}

Reset.PageLayout = HeaderAndFooterWrapper

export default Reset