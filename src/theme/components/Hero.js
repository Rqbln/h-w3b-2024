import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Hero() {
    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? `linear-gradient(180deg, ${alpha('#5e35b1', 0.3)}, ${alpha('#FFF', 0.3)})`
                        : `linear-gradient(${alpha('#5e35b1', 0.3)}, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        Découvrez&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(3rem, 10vw, 4rem)',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                            }}
                        >
                            Wizos
                        </Typography>
                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{
                            fontSize: 'clamp(1rem, 10vw, 2rem)',
                            alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        Apprenez, gagnez, faites vous remarquer.
                    </Typography>
                </Stack>
                <Box
                    id="image"
                    sx={(theme) => ({
                        mt: { xs: 8, sm: 10 },
                        alignSelf: 'center',
                        height: { xs: 200, sm: 700 },
                        width: '100%',
                        position: 'relative', // Position relative pour le conteneur
                        borderRadius: '10px',
                        outline: '1px solid',
                        outlineColor: theme.palette.mode === 'dark' ? alpha('#7824e7', 0.5) : alpha('#9a67ea', 0.1),
                        boxShadow: theme.palette.mode === 'dark' ? `0 0 12px 8px ${alpha('#7824e7', 0.2)}` : `0 0 24px 12px ${alpha('#9a67ea', 0.2)}`,
                    })}
                >
                    <img
                        src="main_page.png"
                        alt="Main Page"
                        style={{
                            position: 'absolute', // Position absolue pour l'image
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover', // Assurez-vous que l'image couvre le conteneur
                        }}
                    />
                </Box>

            </Container>
        </Box>
    );
}