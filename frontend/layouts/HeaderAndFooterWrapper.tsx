import { AppShell, Header, MediaQuery, Burger, useMantineTheme, Group, NavLink, Anchor, Drawer, Stack, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle'
import HeaderLink from '../components/navigations/HeaderLink'
import { BLUE_BG_COLOR, BLUE_DARK_COLOR, PRIMARY_SHADE, WEBSITE_LOGO } from '../config/constants'
import publicStyles from '../styles/publicStyles'
import Link from 'next/link'
import { IconAlertCircle, IconHome2, IconLogin, IconLogout, IconUserCircle, IconUserPlus } from '@tabler/icons'
import { showNotification } from '@mantine/notifications'
import { useAppContext } from '../providers/appProvider'
import AccountBtn from '../components/common/AccountBtn'
import CustomNotifications from '../components/common/CustomNotifications'


interface CustomDrawerLinkProps {
    href: string,
    icon?: React.ReactElement | null,
    label: string,
    children?: CustomDrawerLinkProps[] | null,
    loginRequired?: boolean,
    click?: any
}

const CustomDrawerLink = (props: CustomDrawerLinkProps) => {

    const { label, href, icon, children, loginRequired, click } = props
    return (
        <>
            {
                children && children.length > 0 ? (
                    <NavLink label={label} icon={icon}>
                        {
                            children?.map((child: CustomDrawerLinkProps, i: number) => (
                                <CustomDrawerLink key={`drawer_child_${label}_${i}`} {...child} />
                            ))
                        }
                    </NavLink>
                ) : (
                    <Anchor component={Link} href={href} passHref>
                        <NavLink icon={icon} label={label} onClick={click} />
                    </Anchor>
                )
            }
        </>
    )
}

const navlinks: CustomDrawerLinkProps[] = [
    { label: 'Home', href: '/', icon: <IconHome2 stroke={1.5} color={PRIMARY_SHADE[2]} /> },
]



const accountLinks: CustomDrawerLinkProps[] = [
    {
        label: "Sign Up",
        href: "/auth/signup",
        icon: <IconUserPlus stroke={1.5} color={PRIMARY_SHADE[2]} />,
        loginRequired: false
    },
    {
        label: "Login",
        href: "/auth/login",
        icon: <IconLogin stroke={1.5} color={PRIMARY_SHADE[2]} />,
        loginRequired: false
    },
]

export const LogoutLink = () => {

    const handleLogout = () => {
        showNotification({
            title: "Account logout",
            message: "You have logged out successfully",
            color: "blue",
            icon: <IconAlertCircle stroke={1.5} />
        })
    }

    return (
        <NavLink icon={<IconLogout stroke={1.5} color={PRIMARY_SHADE[2]} />} label={'Logout'}
            onClick={handleLogout} />
    )
}

interface NavbarAndFooterWrapperProps {
    children: React.ReactNode
}

const HeaderAndFooterWrapper = ({ children }: NavbarAndFooterWrapperProps) => {

    const [opened, setOpened] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    const closeDrawer = () => setOpened((o) => !o)

    const { login_status } = useAppContext()

    const theme = useMantineTheme();
    const { classes } = publicStyles()
    const matches = useMediaQuery('(max-width: 992px)');

    useEffect(() => {
        
        if(login_status !== null){
            setLoggedIn(login_status)
        }
        else{
            setLoggedIn(false)
        }
    }, [login_status])

    return (
        <AppShell
            styles={(theme) => ({
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : BLUE_BG_COLOR,
                    overflow: "hidden",
                    transition: "color background-color 1s cubic-bezier(0.42, 0, 1, 1)",
                },
            })}

            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            hidden={!loggedIn}
            padding={0}
            header={
                <Header withBorder={true} height={{ base: 60, md: 70 }} px="md" py="xs" sx={theme => ({
                    backgroundColor: theme.colorScheme === 'dark' ? BLUE_DARK_COLOR : BLUE_BG_COLOR,
                })}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: '100%' }}>
                        <div className='h-100'>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>

                            <img src={WEBSITE_LOGO} className={classes.image} />
                        </div>
                        {matches ? null : (
                            <div>
                                {navlinks.map((link: any, i: number) => (
                                    <HeaderLink key={`header_link_${i}`} {...link} />
                                ))}
                            </div>
                        )}
                        <Group spacing={'sm'}>
                            <CustomNotifications />
                            <ColorSchemeToggle />
                            <AccountBtn />
                        </Group>
                    </div>
                </Header>
            }
        >
            <div style={{ minHeight: "90vh" }}>
                {children}
            </div>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="Menu"
                padding="xl"
                size="md"
                position='bottom'
                styles={{
                    content: {
                        borderTopLeftRadius: "30px !important",
                        borderTopRightRadius: "30px !important",
                    },
                    header: {
                        boxShadow: theme.shadows.md
                    }

                }}
                overlayProps={{
                    opacity: .3,
                    blur: 5,
                }}
                withOverlay
                shadow='lg'
            >
                <Stack spacing={0}>
                    {navlinks.map((linkInfo: CustomDrawerLinkProps, i: number) => (
                        <CustomDrawerLink key={`drawer_link_${i}`} {...linkInfo} click={closeDrawer} />
                    ))}
                </Stack>
                <NavLink label="Account" icon={<IconUserCircle stroke={1.5} color={PRIMARY_SHADE[2]} />}>
                    {loggedIn ? (
                        <>
                            {accountLinks.filter(e => e.loginRequired === true).map((linkInfo: CustomDrawerLinkProps, i: number) => (
                                <CustomDrawerLink key={`drawer_link_loggedin_${i}`} {...linkInfo} click={closeDrawer} />
                            ))}
                            <LogoutLink />
                        </>
                    ) : (
                        <>
                            {accountLinks.filter(e => e.loginRequired === false).map((linkInfo: CustomDrawerLinkProps, i: number) => (
                                <CustomDrawerLink key={`drawer_link_account_${i}`} {...linkInfo} click={closeDrawer} />
                            ))}
                        </>
                    )}
                </NavLink>
                <Box sx={{ height: "30px" }}></Box>
            </Drawer>
        </AppShell>
    )
}

export default HeaderAndFooterWrapper