import React from 'react'
import NextApp, { AppProps, AppContext } from 'next/app';
import Head from 'next/head'
import { getCookie } from 'cookies-next'
import MainProvider from '../layouts/MainProvider'
import { APP_NAME, LOCAL_STORAGE_KEYS, THEME_COOKIE_NAME } from '../config/constants'
import { ColorScheme } from '@mantine/core';


// CSS Styles import
import './../styles/global.css'

// This is to allow different pages to have different layouts since we are not using the app directory.
type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<{ children: React.ReactNode }>,
  },
  colorScheme: ColorScheme,
  user: any,
  loginStatus: any,
}

export default function App({ Component, pageProps, colorScheme, loginStatus }: ComponentWithPageLayout) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <MainProvider colorScheme_={colorScheme}>
        {
          Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          )
            :
            <Component {...pageProps} />
        }
      </MainProvider>
    </>
  );
}


App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie(THEME_COOKIE_NAME, appContext.ctx) || 'dark',
    user: getCookie(LOCAL_STORAGE_KEYS.user, appContext.ctx) || null,
    loginStatus: getCookie(LOCAL_STORAGE_KEYS.login_status, appContext.ctx) || false,
  };
};