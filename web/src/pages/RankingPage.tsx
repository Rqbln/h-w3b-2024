import * as React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';
import {useState} from "react";

const RankingPage = () => {
    const [mode, setMode] = useState<PaletteMode>('light');
    const theme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Box sx={{ pt: 8, pb: 6 }}>
                <h1>Ranking Page</h1>
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default RankingPage;
