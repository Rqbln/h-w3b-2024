import * as React from 'react';
import { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, Container, Paper, Slide } from '@mui/material';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';

interface Rank {
    name: string;
    score: number;
}

const createData = (name: string, score: number): Rank => {
    return { name, score };
}

const rows: Rank[] = [
    createData('tz1Winner', 300),
    createData('tz2Second', 250),
    createData('tz3Third', 200),
    // Ajouter plus d'exemples si nécessaire
    createData('tz4Fourth', 150),
    createData('tz5Fifth', 100),
    createData('tz6Sixth', 90),
    createData('tz7Seventh', 80),
    createData('tz8Eighth', 70),
    createData('tz9Ninth', 60),
    createData('tz10Tenth', 50),
];

const RankingPage: React.FC = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const theme = createTheme(getLPTheme(mode));

    // Définition de la fonction toggleColorMode pour changer le thème
    const toggleColorMode = (): void => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Box sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom component="div">
                    Podium
                </Typography>
                <Container>
                    {rows.slice(0, 3).map((row, index) => (
                        <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={(index + 1) * 500} key={row.name}>
                            <Paper elevation={4} sx={{ p: 2, mb: 2, backgroundColor: index === 0 ? 'gold' : index === 1 ? 'silver' : '#cd7f32' }}>
                                <Typography variant="h6">{index + 1}. {row.name}</Typography>
                                <Typography>Score: {row.score}</Typography>
                            </Paper>
                        </Slide>
                    ))}
                </Container>
                <Typography variant="h5" gutterBottom component="div" sx={{ mt: 4 }}>
                    Les suivants
                </Typography>
                <Container>
                    {rows.slice(3).map((row, index) => (
                        <Paper elevation={2} sx={{ p: 1, mb: 1, backgroundColor: 'background.paper' }} key={row.name}>
                            <Typography>{index + 4}. {row.name} - Score: {row.score}</Typography>
                        </Paper>
                    ))}
                </Container>
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default RankingPage;
