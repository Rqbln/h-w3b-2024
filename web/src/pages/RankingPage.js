import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, Container, Paper, Link, Fade, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Importe l'icône du trophée
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'; // Importe l'icône de la médaille

const createData = (name, score) => {
    return { name, score };
};

const rows = [
    createData('tz1QqdGvik1QaaoEVR5wAs3M8vdGTC4VLhjR', 262),
    createData('tz1apnqLLUKtw6b5ih3BNr61KNG5FeQTjrCD', 237),
    createData('tz1THUNARo58aD5YdNGYPnWNnvd8yHPrD', 231),
    createData('tz1a4GT7THHaGDiTxgXoatDWcZfJ5j29z5RC1D', 207),
    createData('tz1NCwP3JPDK2GbKnWrMctGn6cHt75yPDbTR', 154),
    createData('tz1Xf8zdT3DbAX9cHw3c3CXh79rc4nK4gCe8', 37),
    // Ajoutez d'autres adresses si nécessaire
];

const RankingPage = () => {
    const [mode, setMode] = useState('dark');
    const theme = createTheme(getLPTheme(mode));
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, []);

    const getBackgroundColor = (index) => {
        // Alterne entre deux teintes de violet
        return index % 2 === 0 ? theme.palette.primary.dark : theme.palette.primary.light;
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={() => setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')} />
            <Box
                sx={{
                    pt: { xs: 18, sm: 24 },
                    pb: { xs: 8, sm: 12 },
                    textAlign: 'center',
                    width: '100%',
                    backgroundImage: `linear-gradient(${alpha(theme.palette.primary.dark, 0.3)}, ${alpha(theme.palette.background.default, 0.0)})`,
                    backgroundSize: '100% 25%',
                    backgroundRepeat: 'no-repeat',
                    color: 'white',
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: 'clamp(3rem, 10vw, 4rem)',
                    }}
                >
                    Page&nbsp;<Typography component="span" variant="h1" sx={{ color: theme.palette.primary.main }}>Ranking</Typography>
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                    Classement des utilisateurs Wizos sur les 7 derniers jours
                </Typography>
                <Container maxWidth="md">
                    {rows.map((row, index) => (
                        <Fade in={checked} timeout={500 * (index + 1)} key={row.name}>
                            <Paper elevation={index < 3 ? 6 : 2} sx={{
                                p: 2,
                                mb: 2,
                                backgroundColor: getBackgroundColor(index), // Utilise la fonction pour alterner les couleurs
                                borderRadius: '16px',
                                color: 'text.primary',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                {index < 3 && <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {index === 0 ? <EmojiEventsIcon sx={{ color: 'gold', mr: 1 }}/> : <MilitaryTechIcon sx={{ color: index === 1 ? 'silver' : '#cd7f32', mr: 1 }}/>}
                                    <Typography variant="h6">{index + 1}. {row.name}</Typography>
                                </Box>}
                                {index >= 3 && <Typography variant="h6">{index + 1}. {row.name}</Typography>}
                                <Link href={`https://ghostnet.tzkt.io/${row.name}`} target="_blank" rel="noopener" sx={{ color: 'white' }}>
                                    Explorer
                                </Link>
                                <Box sx={{ backgroundColor: 'black', p: 1, borderRadius: '16px' }}>
                                    <Typography variant="h6" sx={{ color: 'white' }}>Score: {row.score}</Typography>
                                </Box>
                            </Paper>
                        </Fade>
                    ))}
                </Container>
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default RankingPage;
