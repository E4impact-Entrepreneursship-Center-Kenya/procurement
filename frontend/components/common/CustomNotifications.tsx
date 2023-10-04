import { HoverCard, Avatar, Text, Group, Stack, Title, Indicator, useMantineTheme, SegmentedControl, ScrollArea, Tabs, LoadingOverlay, Menu } from '@mantine/core';
import { getTheme, makeRequestOne } from '../../config/config';
import { IconBell } from '@tabler/icons';
import { useMediaQuery } from '@mantine/hooks';
import useSWR from 'swr'
import { URLS } from '../../config/constants';
import { useAppContext } from '../../providers/appProvider';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import HTMLReactParser from 'html-react-parser'

interface ISingleNotification {
    notification: any,
    mutate: any
}
const SingleNotification = ({ notification, mutate }: ISingleNotification) => {
    const [loading, setLoading] = useState(false)
    const { token } = useAppContext()

    function markAsRead() {
        setLoading(true)
        makeRequestOne({
            url: `${URLS.NOTIFICATIONS}/${notification?.id}`,
            method: 'PUT',
            data: {
                read: true
            },
            extra_headers: {
                authorization: `Bearer ${token}`,
            },
            params: {
                fields: 'read'
            },
            useNext: true
        }).then(() => {
            setLoading(false)
            mutate && mutate()
        }).catch(() => { })
    }

    return (
        <Group noWrap p="xs" sx={theme => ({
            background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[1],
            borderRadius: theme.radius.md,
            position: "relative"
        })}>
            <LoadingOverlay visible={loading} />
            <Avatar style={{ fontSize: '22px', textTransform: 'capitalize' }}>
                {notification?.sender?.username[0]}
            </Avatar>
            <Stack spacing={0}>
                <Text size={'sm'} weight={600}>{notification?.form}</Text>
                <Group position='apart' align='center' spacing={2}>
                    <Text size={'xs'}>
                        {HTMLReactParser(notification?.message)}
                    </Text>
                    {
                        notification?.read ? null : (
                            <Text size={'xs'} color='blue' style={{ cursor: "pointer" }} onClick={markAsRead}>Mark as Read</Text>
                        )
                    }
                </Group>
            </Stack>
        </Group>
    )
}

function CustomNotifications() {
    const { user_id } = useAppContext()

    const theme = useMantineTheme()
    const matches = useMediaQuery('(max-width: 500px)');

    const all_notifications: any = useSWR({
        method: 'GET',
        url: URLS.NOTIFICATIONS,
        params: {
            receiver__id: user_id,
            // sender__id: user_id,
            limit: 20,
            ordering: '-id'
        },
    }, makeRequestOne)
    const all_notifs = all_notifications?.data?.data?.results

    const unread_notifications: any = useSWR({
        method: 'GET',
        url: URLS.NOTIFICATIONS,
        params: {
            receiver__id: user_id,
            // sender__id: user_id,
            limit: 20,
            ordering: '-id',
            read: false
        },
    }, makeRequestOne)
    const unread_notifs = unread_notifications?.data?.data?.results

    const read_notifications: any = useSWR({
        method: 'GET',
        url: URLS.NOTIFICATIONS,
        params: {
            receiver__id: user_id,
            // sender__id: user_id,
            limit: 20,
            ordering: '-id',
            read: true
        },
    }, makeRequestOne)
    const read_notifs = read_notifications?.data?.data?.results

    const segmentForm = useForm({
        initialValues: {
            tab: 'all',
        }
    })

    const mutatate = () => {
        all_notifications?.mutate()
        unread_notifications?.mutate()
        read_notifications?.mutate()
    }

    return (
        <Group position="center">
            <Menu zIndex={1000} width={matches ? 320 : 350} radius={'md'} position={matches ? 'bottom-start' : 'bottom-end'} shadow="lg" withArrow={false} openDelay={200} closeDelay={400} styles={{
                dropdown: {
                    border: `1px solid ${theme.colors.green[6]}`
                }
            }}>
                <Menu.Target>
                    <Indicator inline label={unread_notifs?.length} radius={'sm'} color='red' px={'xs'} size={16} position='bottom-center'>
                        <Avatar size={44} radius="md" sx={theme => ({
                            background: getTheme(theme) ? theme.colors.dark[7] : theme.colors.gray[0],
                            cursor: "pointer",
                            textTransform: "uppercase",
                        })}>
                            <IconBell />
                        </Avatar>
                    </Indicator>
                </Menu.Target>
                <Menu.Dropdown>
                    <Stack spacing={'xs'}>
                        <Title order={4} weight={600} color='green' size={14}>NOTIFICATIONS</Title>

                        <SegmentedControl
                            {...segmentForm.getInputProps('tab')}
                            color='green'
                            size='sm'
                            radius='md'
                            data={[
                                { label: `All (${all_notifs?.length})`, value: 'all' },
                                { label: `Unread (${unread_notifs?.length})`, value: 'unread' },
                                { label: `Read (${read_notifs?.length})`, value: 'read' },
                            ]} />
                        <ScrollArea h={300}>

                            <Tabs value={segmentForm.values.tab}>
                                <Tabs.Panel value="all" pt="xs">
                                    <Stack spacing={6}>
                                        {
                                            all_notifs?.length === 0 ? <Text align='center' weight={600}>No notifcations</Text> : null
                                        }
                                        {
                                            all_notifs?.map((notification: any, i: number) => (
                                                <SingleNotification key={`notification_${i}`} mutate={mutatate} notification={notification} />
                                            ))
                                        }
                                    </Stack>
                                </Tabs.Panel>
                                <Tabs.Panel value="unread" pt="xs">
                                    <Stack spacing={6}>
                                        {
                                            unread_notifs?.length === 0 ? <Text align='center' weight={600}>No notifcations</Text> : null
                                        }
                                        {
                                            unread_notifs?.map((notification: any, i: number) => (
                                                <SingleNotification key={`unread_notification_${notification?.id}`} mutate={mutatate} notification={notification} />
                                            ))
                                        }
                                    </Stack>
                                </Tabs.Panel>
                                <Tabs.Panel value="read" pt="xs">
                                    <Stack spacing={6}>
                                        {
                                            read_notifs?.length === 0 ? <Text align='center' weight={600}>No notifcations</Text> : null
                                        }
                                        {
                                            read_notifs?.map((notification: any, i: number) => (
                                                <SingleNotification key={`read_notification_${notification?.id}`} mutate={mutatate} notification={notification} />
                                            ))
                                        }
                                    </Stack>
                                </Tabs.Panel>
                            </Tabs>

                        </ScrollArea>
                    </Stack>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}

export default CustomNotifications