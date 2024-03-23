import * as React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';
import {useState} from "react";

const QuizzPage = () => {
    const [mode, setMode] = useState<PaletteMode>('dark');
    const theme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Box sx={{ pt: 8, pb: 6 }}>
                <h1>Quizz Page</h1>
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default QuizzPage;
