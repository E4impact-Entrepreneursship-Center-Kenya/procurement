import { Center, Title } from '@mantine/core';
import HeaderAndFooterWrapper from '../layouts/HeaderAndFooterWrapper';
import publicStyles from '../styles/publicStyles';

function PageNotFound() {
    const {classes, theme} = publicStyles()
    return (
        <>
            <Center style={{ height: 'calc(100vh - 80px)' }}>
                <Title className={classes.title}>Page Not Found</Title>
            </Center>
        </>
    );
}


PageNotFound.PageLayout = HeaderAndFooterWrapper

export default PageNotFound