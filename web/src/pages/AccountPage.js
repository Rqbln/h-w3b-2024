import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, Container, Paper, Link, Fade, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';
import { Avatar } from '@mui/material'; // Importe le composant Avatar pour afficher une image de profil

// Définit les données de profil
const profiles = [
    {
        name: "John Doe",
        balance: "52.47 XTZ",
        badges: ["Badge 1", "Badge 2", "Badge 3"], // Ajoutez les badges
        image: "logo.png",
        address: "tz1apnqLLUKtw6b5ih3BNr61KNG5FeQTjrCD",
    },
    // Ajoutez d'autres profils si nécessaire
];

const ProfilePage = () => {
    const [mode, setMode] = useState('dark');
    const theme = createTheme(getLPTheme(mode));
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, []);

    // Fonction pour obtenir la couleur d'arrière-plan de la carte en fonction de l'index
    const getBackgroundColor = (index) => {
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
                    backgroundSize: '100% 80%',
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
                    Page&nbsp;<Typography component="span" variant="h2" sx={{ color: theme.palette.primary.main }}>Profil</Typography>
                </Typography>
                <Container maxWidth="md">
                    {profiles.map((profile, index) => (
                        <Fade in={checked} timeout={500 * (index + 1)} key={profile.name}>
                            <Paper elevation={index < 3 ? 6 : 2} sx={{
                                p: 2,
                                mb: 2,
                                backgroundColor: getBackgroundColor(index), // Utilise la fonction pour alterner les couleurs
                                borderRadius: '16px',
                                color: 'text.primary',
                            }}>
                                {/* Contenu de la carte */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {/* Affiche l'image de profil */}
                                    <Avatar src={profile.image} alt={profile.name} sx={{ width: 120, height: 120, mb: 2 }} />
                                    <Typography variant="h5" mb={1}>Pseudo: WIZOS</Typography>
                                    <Typography variant="body1" mb={1}>Votre balance: {profile.balance}</Typography>
                                    <Typography variant="body1" mb={1}>Vos Badges:</Typography>

                                    {/* Lien pour explorer */}
                                    <Link href={`https://ghostnet.tzkt.io/${profile.address}`} target="_blank" rel="noopener" sx={{ color: 'white', mt: 2 }}>
                                        Explorer
                                    </Link>
                                    {/* Affiche le score */}
                                    <Box sx={{ backgroundColor: 'black', p: 1, borderRadius: '16px', mt: 2 }}>
                                        <Typography variant="h6" sx={{ color: 'white' }}>Score: 27</Typography>
                                    </Box>
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

export default ProfilePage;
