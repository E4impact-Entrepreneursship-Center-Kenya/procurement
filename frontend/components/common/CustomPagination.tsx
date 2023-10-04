import { Box, Pagination } from '@mantine/core'
import React from 'react'
import Link from 'next/link'
import { updatePageFilter } from '../../config/functions'

interface PaginationProps {
    pages: number,
    setPage?: any,
    active?: any,
    pageURL?: string,
}

const CustomPagination = (props: PaginationProps) => {
    const { pages, setPage, active } = props
    return (
        <>
            {
                pages > 1 ? (
                    <Pagination
                        value={active || 1}
                        total={pages ? Math.ceil(pages) : 1}
                        position="left"
                        onChange={page => setPage(page)}
                    />
                ) : null
            }
        </>
    )
}

const CustomLink = (props: any) => {
    return (
        <Box component={Link} href={props?.href}>
            <a {...props} />
        </Box>
    )
}

export const CustomLinkPagination = (props: PaginationProps) => {
    const { pages, setPage, active, pageURL } = props
    return (
        <>
            {
                pages > 1 ? (
                    <Pagination
                        value={parseInt(active)}
                        total={pages}
                        position="left"
                        withControls={false}
                        getItemProps={(page) => ({
                            component: CustomLink,
                            // href: `${pageURL}?page=${page}`,
                            href: updatePageFilter(pageURL, page)
                        })}
                        styles={(theme) => ({
                            control: {
                                '&[data-active]': {
                                    backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
                                },
                            },
                        })}
                    />
                ) : null
            }
        </>
    )
}

export default CustomPagination