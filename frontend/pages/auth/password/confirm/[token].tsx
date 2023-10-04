import React from 'react'
import { Anchor, Box, Card, Container, Grid, Group, Stack, Text, TextInput, Title, Center, Image, PasswordInput } from '@mantine/core'
import { IconAlertCircle, IconAlertOctagon, IconAlertTriangle, IconMail, IconPassword } from '@tabler/icons'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import publicStyles from '../../../../styles/publicStyles'
import { CallToActionButtonAction } from '../../../../components/cta/CallToActionButton'
import HeaderAndFooterWrapper from '../../../../layouts/HeaderAndFooterWrapper'
import { RequestProps, alertModalOptions, getTheme, makeRequest, makeRequestOne } from '../../../../config/config'
import { URLS, WEBSITE_LOGO } from '../../../../config/constants'
import { displayErrors } from '../../../../config/functions'
import { LOCAL_STORAGE_KEYS, useAppContext } from '../../../../providers/appProvider'
import { useSearchParams } from 'next/navigation';
import { modals } from '@mantine/modals'
import AlertModal from '../../../../components/notifications/AlertModal'

const Reset = (props: any) => {
    const { login_status } = useAppContext()
    const router = useRouter()
    const params = useSearchParams()
    const token = params.get('token')

    const { classes, theme } = publicStyles()

    const form = useForm({
        initialValues: {
            password: '',
            confirm_password: ''
        },
        validate: {
            password: (value) => {
                if (value === '') {
                    return "Enter a password"
                }
                else if (value?.length < 8) {
                    return "Password should be 8 characters long"
                }
                return null
            },
            confirm_password: (value) => {
                if (value === '') {
                    return "Confirm your password"
                }
                else if (value?.length < 8) {
                    return "Password should be 8 characters long"
                }
                else if (value !== form.values.password) {
                    return "Passwords do not match"
                }
                return null
            },
        }
    })

    const openAlertModal = () => modals.open({
        ...alertModalOptions,
        children: (
            <AlertModal title='Password Reset' text='Your password has been reset successfully' />
        )
    })

    const handlePasswordReset = () => {
        const options: RequestProps = {
            url: `${URLS.PASSWORD_RESET_CONFIRM}`,
            method: 'POST',
            extra_headers: {},
            data: { token: token, password: form.values.password },
            params: {},
            useNext: true
        }
        makeRequestOne(options).then((res: any) => {
            openAlertModal()
            router.push('/auth/login/')
        }).catch((error) => {
            console.log(error)
            const errors = error?.response?.data
            displayErrors(form, errors)
            if (errors?.detail) {
                showNotification({
                    title: 'Reset Password Token Has expired',
                    message: "The token you are trying to use has already been used or expired",
                    color: 'indigo',
                    icon: <IconAlertTriangle stroke={1.5} />,
                })
            }
            else {
                showNotification({
                    title: 'Error',
                    message: "An error occurred. Please try again",
                    color: 'red',
                    icon: <IconAlertTriangle stroke={1.5} />,
                })
            }
        })
    }

    React.useEffect(() => {
        if (login_status) {
            showNotification({
                title: 'Not Allowed',
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
                        background: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[1]
                    }}>
                        <Stack>
                            <Center>
                                <Image src={WEBSITE_LOGO} radius="md" className={classes.image} width={200} />
                            </Center>
                            <Title className={classes.title2} align='center'>Reset Password</Title>
                            <Text align='center'>Please fill in the form below to reset your password</Text>
                            <form onSubmit={form.onSubmit((values) => handlePasswordReset())} autoComplete="off">
                                <Grid>
                                    <Grid.Col>
                                        <PasswordInput
                                            label="Password Confirm"
                                            placeholder='Enter your password'
                                            radius="md"
                                            icon={<IconPassword stroke={1.5} />}
                                            autoFocus={true}
                                            {...form.getInputProps('password')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col>
                                        <PasswordInput
                                            label='Confirm password'
                                            placeholder='Confirm password'
                                            radius="md"
                                            icon={<IconPassword stroke={1.5} />}
                                            autoFocus={true}
                                            {...form.getInputProps('confirm_password')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col>
                                        <Stack align='center' spacing={16}>
                                            <CallToActionButtonAction label={'Reset Password'} type='submit' icon={<IconPassword stroke={1.5} color='white' />} />
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