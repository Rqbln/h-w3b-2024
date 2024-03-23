import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, Grid, Card, CardContent, CardActions, CardMedia, Button, Container, alpha } from '@mui/material';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';

const quizzs = ;

const QuizzPage = () => {
    const [mode, setMode] = useState('dark');
    const theme = createTheme(getLPTheme(mode));

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
                    Notre équipe formée spécialement pour ce Hackaton
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {presentations.map((presentation, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    height="img"
                                    image={presentation.image}
                                    alt={presentation.alt}
                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        {presentation.name}
                                    </Typography>
                                    <Typography>
                                        {presentation.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {presentation.socials.map((social, index) => (
                                        <Button size="small" href={social.url} key={index}>
                                            {social.name}
                                        </Button>
                                    ))}
                                </CardActions>
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
