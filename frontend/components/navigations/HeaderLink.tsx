import { Anchor, Text, useMantineTheme } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { getTheme, matchTest } from '../../config/config';
import { PRIMARY_SHADE, LINK_WEIGHT } from '../../config/constants';

interface HeaderLinkProps {
    label: string,
    href: string,
    icon?: React.ReactNode,
}

const HeaderLink = ({ label, href, icon }: HeaderLinkProps) => {
    const theme = useMantineTheme()
    const router = useRouter()

    const match = () => {
        const path = router.asPath
        return matchTest(path, href)
    }
    return (
        <Anchor href={href} component={Link} mr="xl"
            color={match() ? PRIMARY_SHADE[2] : getTheme(theme) ? theme.white : theme.colors.dark[6]}
            size="kmd" underline={false} weight={LINK_WEIGHT}>
            {label}
        </Anchor>
    )
}

export default HeaderLink