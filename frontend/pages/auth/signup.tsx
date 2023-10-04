import React, { useState } from 'react'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import { Anchor, Box, Card, Image, Container, Grid, Group, Stack, Text, TextInput, Title, Center, useMantineTheme, LoadingOverlay } from '@mantine/core'
import publicStyles from '../../styles/publicStyles'
import { CallToActionButtonAction } from '../../components/cta/CallToActionButton'
import { IconAlertCircle, IconAlertTriangle, IconMail, IconPhone, IconUser, IconUserPlus } from '@tabler/icons'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useAppContext } from '../../providers/appProvider'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import { RequestProps, getTheme, makeRequestOne } from '../../config/config'
import { EMOJIS, LOCAL_STORAGE_KEYS, URLS, WEBSITE_LOGO } from '../../config/constants'
import { displayErrors } from '../../config/functions'
import { useForm } from '@mantine/form'
import SEOHeader, { SEOHeaderProps } from '../../components/seo/SEOHeader'
import CustomPasswordInput from '../../components/auth/CustomPasswordInput'

const SignUp = (props: any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { login_status } = useAppContext()
    const { classes } = publicStyles()
    const router = useRouter()
    const theme = useMantineTheme()

    const emailRegex = /[A-Za-z0-9._%+-]+@e4impact\.org/gi

    const form = useForm({
        initialValues: {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            profile: {
                // profile_photo: '',
                phone_no: '',
            },
            password: '',
            password2: '',
        },
        validate: {
            username: (value) => value === '' ? 'Username is required' : null,
            first_name: (value) => value === '' ? 'First name is required' : null,
            last_name: (value) => value === '' ? 'Last name is required' : null,
            email: (value) => {
                if (value === '') {
                    return "Email is required"
                }
                else if (!emailRegex.test(value)) {
                    return "Only E4Impact emails are required!"
                }
                return null
            },
            password: (value) => {
                if (value === '') {
                    return 'Password is required'
                }
                if (value.length < 8) {
                    return 'Password must be at least 8 characters long'
                }
                if (value !== form.values.password2) {
                    return 'Passwords do not match'
                }
                return null
            },
            password2: (value) => value === '' ? 'Password confirmation is required' : null,
        }
    })


    const handleSignup = () => {
        const requestOptions: RequestProps = {
            url: `${URLS.REGISTER}`,
            method: 'POST',
            extra_headers: {},
            data: form.values,
            params: {},
            useNext: true,
        }
        setLoading(true)
        makeRequestOne(requestOptions).then((res: any) => {
            showNotification({
                title: `Congratulations ${EMOJIS['partypopper']} ${EMOJIS['partypopper']}`,
                message: "Account created successfully. Please login to continue",
                color: 'green',
                icon: <IconAlertCircle stroke={1.5} />,
            })
            router.push('/auth/login')
        }).catch((error) => {
            const errors = error?.response?.data
            displayErrors(form, errors)
            showNotification({
                title: 'Error',
                message: error?.message,
                color: 'red',
                icon: <IconAlertTriangle stroke={1.5} />,
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    const seoDetails: SEOHeaderProps = {
        url: '/auth/signup',
        title: 'Sign Up',
        description: 'Create a new account',
        keywords: '',
        image: '',
        twitter_card: ''
    }


    React.useEffect(() => {
        if (login_status) {
            router.push('/')
        }
    }, [login_status])

    return (
        <div>
            <SEOHeader {...seoDetails} />
            <Box>
                <Container size={"xs"} py={50}>
                    <Card radius="lg" p={50} style={{
                        background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[0],
                        position: "relative",
                    }}>
                        <LoadingOverlay visible={loading} />
                        <Stack>
                            <Center>
                                <Image src={WEBSITE_LOGO} radius="md" className={classes.image} width={200} />
                            </Center>
                            <Title className={classes.title2} align='center'>Sign Up</Title>
                            <Text align='center'>Create a new free account.</Text>
                            <form onSubmit={form.onSubmit((values) => handleSignup())}>
                                <Grid>
                                    <Grid.Col md={6}>
                                        <TextInput
                                            label="First Name"
                                            placeholder='Enter your first name'
                                            radius="md"
                                            icon={<IconUser stroke={1.5} />}
                                            autoFocus={true}
                                            {...form.getInputProps('first_name')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col md={6}>
                                        <TextInput
                                            label="Last Name"
                                            placeholder='Enter your last name'
                                            radius="md"
                                            icon={<IconUser stroke={1.5} />}
                                            {...form.getInputProps('last_name')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col md={6}>
                                        <TextInput
                                            label="Email"
                                            placeholder='Enter your email'
                                            radius="md"
                                            icon={<IconMail stroke={1.5} />}
                                            {...form.getInputProps('email')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col md={6}>
                                        <TextInput
                                            label="Username"
                                            placeholder='Enter your username'
                                            radius="md"
                                            icon={<IconUser stroke={1.5} />}
                                            {...form.getInputProps('username')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col md={6}>
                                        <TextInput
                                            label="Phone Number"
                                            placeholder='Enter your phone number'
                                            radius="md"
                                            icon={<IconPhone stroke={1.5} />}
                                            {...form.getInputProps('profile.phone_no')}
                                        />
                                    </Grid.Col>
                                    {/* <Grid.Col md={6}>
                                        <FileInput
                                            label="Profile Photo"
                                            placeholder='Select profile photo'
                                            radius="md"
                                            icon={<IconCamera stroke={1.5} />}
                                            accept="image/*"
                                            {...form.getInputProps('profile.profile_photo')}
                                        />
                                    </Grid.Col> */}
                                    <Grid.Col md={6}>
                                        <CustomPasswordInput form={form} fieldName={'password'} label={'Password'} />
                                    </Grid.Col>
                                    <Grid.Col md={6}>
                                        <CustomPasswordInput form={form} fieldName={'password2'} label={'Repeat Password'} />
                                    </Grid.Col>
                                    <Grid.Col>
                                        <Stack align='center' spacing={16}>
                                            <CallToActionButtonAction label={'Create Account'} type='submit' icon={<IconUserPlus stroke={1.5} color='white' />} />
                                            <Group spacing={4} p={0}>
                                                <Text size="sm">
                                                    Already have an account?
                                                </Text>
                                                <Anchor component={Link} href="/auth/login" size="sm">
                                                    Login
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

SignUp.PageLayout = HeaderAndFooterWrapper

export async function getServerSideProps(context: any) {

    const status = getCookie(LOCAL_STORAGE_KEYS.login_status, context)

    return {
        props: {
            loginStatus: status ? status : null
        }, // will be passed to the page component as props
    }
}

export default SignUp