import React, { useState } from 'react'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import { Anchor, Box, Card, Container, Grid, Group, PasswordInput, Stack, Text, TextInput, Title, Center, Image, LoadingOverlay } from '@mantine/core'
import publicStyles from '../../styles/publicStyles'
import { CallToActionButtonAction } from '../../components/cta/CallToActionButton'
import { IconAlertTriangle, IconLogin, IconPassword, IconUser } from '@tabler/icons'
import Link from 'next/link'
import { globalLogout, useAppContext } from '../../providers/appProvider'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useForm } from '@mantine/form'
import { RequestProps, getTheme, makeRequestOne } from '../../config/config'
import { LOCAL_STORAGE_KEYS, URLS, WEBSITE_LOGO } from '../../config/constants'
import { displayErrors } from '../../config/functions'
import { showNotification } from '@mantine/notifications'
import SEOHeader, { SEOHeaderProps } from '../../components/seo/SEOHeader'

const Login = (props: any) => {
    const { login, login_status, user } = useAppContext()
    const [loading, setLoading] = useState<boolean>(false)

    const { classes, theme } = publicStyles()
    const { replace, push, query, pathname } = useRouter()

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: {
            username: (value) => value === '' ? 'Username is required' : null,
            password: (value) => value === '' ? 'Password is required' : null,
        }
    })

    const handleLogin = () => {
        const requestOptions: RequestProps = {
            url: `${URLS.LOGIN}`,
            method: "POST",
            extra_headers: {},
            data: form.values,
            params: {},
            useNext: true,
        }
        setLoading(true)
        makeRequestOne(requestOptions).then((res: any) => {
            login(res?.data?.user, res?.data?.token)
        }).catch((error) => {
            const errors = error?.response?.data
            displayErrors(form, errors)
            if (errors?.non_field_errors) {
                showNotification({
                    title: 'Error',
                    message: "Unable to login with the provided credentials",
                    color: 'red',
                    icon: <IconAlertTriangle stroke={1.5} />,
                })
            }
            else {
                showNotification({
                    title: 'Error',
                    message: error?.message,
                    color: 'red',
                    icon: <IconAlertTriangle stroke={1.5} />,
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const seoDetails: SEOHeaderProps = {
        url: '/auth/login',
        title: 'Login',
        description: 'Login to your account',
        keywords: '',
        image: '',
        twitter_card: ''
    }

    React.useEffect(() => {
        if (query?.message) {
            globalLogout();
            const updatedQuery = { ...query };
            delete updatedQuery.message;
            replace({
                pathname: pathname,
                query: updatedQuery,
            });
        }
        else {
            if (login_status) {
                push('/')
            }
        }
    }, [login_status])

    return (
        <div>
            <SEOHeader {...seoDetails} />
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
                            <Title className={classes.title2} align='center'>Login</Title>
                            <Text align='center'>Please login to your account to get started.</Text>
                            <form onSubmit={form.onSubmit((values) => handleLogin())}>
                                <Grid>
                                    <Grid.Col>
                                        <TextInput
                                            label="Username"
                                            placeholder='Enter your username'
                                            radius="md"
                                            icon={<IconUser stroke={1.5} />}
                                            autoFocus={true}
                                            {...form.getInputProps('username')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col>
                                        <PasswordInput
                                            label="Password"
                                            placeholder='Enter your password'
                                            radius="md"
                                            icon={<IconPassword stroke={1.5} />}
                                            {...form.getInputProps('password')}
                                        />

                                    </Grid.Col>
                                    <Grid.Col>
                                        <Stack align='center' spacing={16}>
                                            <CallToActionButtonAction label={'Login'} type='submit' icon={<IconLogin stroke={1.5} color='white' />} />
                                            <Group spacing={4} p={0}>
                                                <Text size="sm">
                                                    Forgot Password?
                                                </Text>
                                                <Anchor component={Link} href="/auth/password/reset" size="sm">
                                                    Reset Password
                                                </Anchor>
                                            </Group>
                                            <Group spacing={4} p={0}>
                                                <Text size="sm">
                                                    Don&apos;t have an account?
                                                </Text>
                                                <Anchor component={Link} href="/auth/signup" size="sm">
                                                    Sign up
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
        </div>
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

Login.PageLayout = HeaderAndFooterWrapper

export default Login