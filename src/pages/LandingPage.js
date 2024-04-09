import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../theme/components/AppAppBar';
import Hero from '../theme/components/Hero';
import LogoCollection from '../theme/components/LogoCollection';
import Footer from '../theme/components/Footer';
import getLPTheme from '../theme/getLPTheme';

export default function LandingPage() {
    const [mode, setMode] = React.useState('dark');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    //const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    /*const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };*/

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Hero />
            <Box sx={{ bgcolor: 'background.default' }}>
                <LogoCollection />
                <Divider />
                <Footer />
            </Box>
            {/*<ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
    />*/}
        </ThemeProvider>
    );
}
