import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material'; // Importation correcte de PaletteMode
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../theme/components/AppAppBar';
import Footer from '../theme/components/Footer';
import getLPTheme from '../theme/getLPTheme';

interface BaseLayoutProps {
    children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const theme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => { // Définir une fonction pour basculer le mode
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> {/* Passer toggleColorMode */}
            <main>{children}</main>
            <Footer />
        </ThemeProvider>
    );
};

export default BaseLayout;
