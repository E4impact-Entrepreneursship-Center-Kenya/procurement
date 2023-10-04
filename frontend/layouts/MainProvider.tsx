import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications'
import { setCookie } from 'cookies-next';
import React, { useState } from 'react'
import { THEME_COOKIE_NAME } from '../config/constants';
import AppProvider from '../providers/appProvider';

interface MainProviderProps {
    colorScheme_: ColorScheme,
    children: React.ReactNode,
}

const MainProvider = ({ colorScheme_, children }: MainProviderProps) => {

    const [colorScheme, setColorScheme] = useState<ColorScheme>(colorScheme_);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        setCookie(THEME_COOKIE_NAME, nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
    };

    return (
        <AppProvider>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{ colorScheme, fontFamily: "Bai Jamjuree", primaryColor: 'green' }} withGlobalStyles withNormalizeCSS>
                    <ModalsProvider>
                        {children}
                    </ModalsProvider>
                    <Notifications position='top-right' transitionDuration={200} autoClose={1000} />
                </MantineProvider>
            </ColorSchemeProvider>
        </AppProvider>
    )
}

export default MainProvider