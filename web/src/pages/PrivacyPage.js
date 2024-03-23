import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography } from '@mui/material';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';

const PrivacyPage = () => {
    const [mode, setMode] = React.useState('dark');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const theme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Box sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: 'clamp(3rem, 10vw, 4rem)',
                    }}
                >
                    Page&nbsp;
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: 'clamp(3rem, 10vw, 4rem)',
                            color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                        }}
                    >
                        Privacy Policy
                    </Typography>
                </Typography>
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default PrivacyPage;
