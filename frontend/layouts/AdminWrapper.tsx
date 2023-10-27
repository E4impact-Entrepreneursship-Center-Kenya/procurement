import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Group,
    Box,
    ScrollArea,
    Stack,
    NavLink,
} from '@mantine/core';
import publicStyles from '../styles/publicStyles';
import { useMediaQuery } from '@mantine/hooks';
import AccountBtn from '../components/common/AccountBtn';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { BLUE_DARK_COLOR, BLUE_BG_COLOR, WEBSITE_LOGO } from '../config/constants';
import SidebarLink, { SidebarLinkGroupProps } from '../components/navigations/SidebarLink';
import { IconDashboard, IconHome2, IconLogout, IconSettings, IconUsers } from '@tabler/icons';
import { useAppContext } from '../providers/appProvider';
import CustomNotifications from '../components/common/CustomNotifications';


const sidebarLinkGroups: SidebarLinkGroupProps[] = [
    {
        id: "application",
        label: "Application",
        links: [
            {
                label: 'App Home',
                icon: <IconHome2 stroke={1.5} />,
                href: '/'
            },
            {
                label: 'Dashboard',
                icon: <IconDashboard stroke={1.5} />,
                href: '/admin'
            },
        ],
    },
    {
        id: "users",
        label: "Users",
        links: [
            {
                label: 'All Users',
                icon: <IconUsers stroke={1.5} />,
                href: '/admin/users'
            },
        ],
    },
    {
        id: "projects",
        label: "Projects",
        links: [
            {
                label: 'All Projects',
                icon: <IconUsers stroke={1.5} />,
                href: '/admin/projects'
            },
        ],
    },
]

interface AdminWrapperProps {
    children: React.ReactNode
}

export default function AdminWrapper({ children }: AdminWrapperProps) {
    const {logout, login_status} = useAppContext()
    const [opened, setOpened] = useState(false);
    const closeDrawer = () => setOpened((o) => !o)

    const theme = useMantineTheme();
    const { classes } = publicStyles()
    const matches = useMediaQuery('(max-width: 992px)');

    return (
        <AppShell
            styles={(theme) => ({
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
                    overflow: "hidden",
                    transition: "color background-color 1s cubic-bezier(0.42, 0, 1, 1)",
                },
            })}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar withBorder={false} p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 250 }}
                    style={{
                        backgroundColor: theme.colorScheme === 'dark' ? BLUE_DARK_COLOR : BLUE_BG_COLOR,
                    }}>
                    <Navbar.Section grow component={ScrollArea} scrollbarSize={4} mx="-xs" px="xs">
                        {
                            sidebarLinkGroups.map((group: SidebarLinkGroupProps, i: number) => (
                                <Box key={`group_${group.id}`} mb={10}>
                                    <Text mb={6}>{group.label}</Text>
                                    {
                                        group.links.map((link, index) => (
                                            <SidebarLink key={`${index}_nav`} {...link} click={closeDrawer} />
                                        ))
                                    }
                                </Box>
                            ))
                        }
                    </Navbar.Section>
                    <Navbar.Section>
                        <Stack style={{ height: "130px" }} justify="flex-end" spacing={0}>
                            <SidebarLink icon={<IconSettings stroke={1.5} />} label={'Settings'} href={'/'} click={closeDrawer} />
                            <NavLink icon={<IconLogout stroke={1.5} />} label={'Logout'} onClick={() => {
                                closeDrawer()
                                logout()
                            }} style={{
                                borderRadius: theme.radius.md,
                            }} />
                        </Stack>
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <Header withBorder={false} zIndex={150} height={{ base: 50, md: 60 }} px="md" py="xs" sx={theme => ({
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
        </AppShell>
    );
}