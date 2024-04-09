import * as React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, PaletteMode } from '@mui/material';
import AppAppBar from '../theme/components/AppAppBar';
import getLPTheme from '../theme/getLPTheme';
import Footer from '../theme/components/Footer';
import { useState } from "react";

const AboutPage = () => {
    const [mode, setMode] = useState<PaletteMode>('dark');
    const theme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
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
                            color: (theme) =>
                                theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                        }}
                    >
                        About
                    </Typography>
                </Typography>
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default AboutPage;
