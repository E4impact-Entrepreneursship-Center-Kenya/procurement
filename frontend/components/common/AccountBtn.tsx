import { Menu, Avatar } from '@mantine/core';
import { IconSettings, IconLogout, IconQuote, IconLogin, IconUserPlus, IconDashboard } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../providers/appProvider';
import Link from 'next/link';
import { getTheme, limitChars } from '../../config/config';
import publicStyles from '../../styles/publicStyles';

function AccountBtn() {

    const { user, logout, login_status } = useAppContext();
    const [loggedInUser, setloggedInUser] = useState<any>(null)
    const [loggedIn, setLoggedIn] = useState(false)

    const { theme } = publicStyles()

    useEffect(() => {
        setLoggedIn(login_status)
        setloggedInUser(JSON.parse(user ? user : "{}"))
    }, [login_status, user])

    return (
        <Menu shadow="md" width={200} radius="md" withArrow arrowSize={16} transitionProps={{ transition: "slide-up" }} zIndex={3000}>
            <Menu.Target>
                <Avatar size={44} radius="md" sx={{
                    background: getTheme(theme) ? theme.colors.dark[7] : theme.colors.gray[0],
                    cursor: "pointer",
                    textTransform: "uppercase",
                    zIndex: 3000,
                }}
                    src={loggedInUser?.profile?.avatar?.image_url}>
                    {loggedInUser?.username ? loggedInUser.username[0] : "L"}
                </Avatar>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>
                    {
                        loggedIn ? (
                            <>Welcome back {limitChars(loggedInUser?.username, 16)}</>
                        ) : "Application"
                    }
                </Menu.Label>
                {
                    loggedIn ? (
                        <>
                            <Menu.Item icon={<IconSettings size={14} />} component={Link} href="/account">Account</Menu.Item>
                            <Menu.Item icon={<IconQuote size={14} />} component={Link} href="/account/forms">My Forms</Menu.Item>
                            {
                                loggedInUser?.is_superuser ? (
                                    <>
                                        <Menu.Divider />
                                        <Menu.Item component={Link} href="/admin" icon={<IconDashboard size={14} />}>Admin</Menu.Item>
                                    </>
                                ) : null
                            }
                            <Menu.Divider />
                            <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={logout}>Logout</Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item component={Link} href="/auth/login" icon={<IconLogin size={14} />}>Login</Menu.Item>
                            <Menu.Item component={Link} href="/auth/signup" icon={<IconUserPlus size={14} />}>Sign Up</Menu.Item>
                        </>
                    )
                }
            </Menu.Dropdown>
        </Menu>
    );
}

export default AccountBtn