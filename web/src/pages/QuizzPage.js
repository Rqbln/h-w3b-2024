import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, Grid, Card, CardContent, CardActions, CardMedia, Button, Container, alpha } from '@mui/material';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';
import axios from 'axios';

const QuizzPage = () => {
    const [mode, setMode] = useState('dark');
    const [quizzs, setQuizzs] = useState([]);
    const theme = createTheme(getLPTheme(mode));

    useEffect(() => {
        const fetchQuizzs = async () => {
            try {
                const response = await axios.get('/api/quizzs');
                setQuizzs(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des quizz:', error);
            }
        };

        fetchQuizzs();
    }, []);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} />
            <Box
                sx={{
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                    textAlign: 'center',
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? `linear-gradient(180deg, ${alpha('#5e35b1', 0.3)}, ${alpha('#FFF', 0.3)})`
                            : `linear-gradient(${alpha('#5e35b1', 0.3)}, ${alpha('#090E10', 0.0)})`,
                    backgroundSize: '100% 80%',
                    backgroundRepeat: 'no-repeat',
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
                    Page&nbsp;
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: 'clamp(3rem, 10vw, 4rem)',
                            color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                        }}
                    >
                        Quizz
                    </Typography>
                </Typography>
            </Box>
            <Container sx={{ py: 4 }}>
                <Typography variant="h5" sx={{ mb: 4 }}>
                    Découvrez nos quizz
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {quizzs.map((quizz, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        {quizz.titre}
                                    </Typography>
                                    <Typography>
                                        Auteur: {quizz.auteur}
                                    </Typography>
                                    <Typography>
                                        Thème: {quizz.theme}
                                    </Typography>
                                    <Typography>
                                        Date: {new Date(quizz.date).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};
export default QuizzPage;
