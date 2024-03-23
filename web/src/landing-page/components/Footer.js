import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';

const logoStyle = {
    width: '40px',
    height: 'auto',
};

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" mt={1}>
            {'Copyright © Wizos '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    // Définir la variable offset pour décaler les boîtes
    const offset = 20; // Changer la valeur selon vos besoins

    return (
        <footer className="footer" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 4, sm: 8 },
                    py: { xs: 8, sm: 10 },
                    textAlign: { sm: 'center', md: 'left' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            minWidth: { xs: '100%', sm: '60%' },
                            alignItems: 'center',
                            marginLeft: -125, // Utiliser la variable offset pour décaler la boîte
                        }}
                    >

                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            gap: 1,
                            alignItems: 'center',
                            marginLeft: offset, // Utiliser la variable offset pour décaler la boîte
                        }}
                    >
                        <Typography variant="body2" fontWeight={600}>
                            Product
                        </Typography>
                        <Link color="text.secondary" href="/quizz">
                            Duel
                        </Link>
                        <Link color="text.secondary" href="/ranking">
                            Ranking
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            gap: 1,
                            alignItems: 'center',
                            marginLeft: offset, // Utiliser la variable offset pour décaler la boîte
                        }}
                    >
                        <Typography variant="body2" fontWeight={600}>
                            Company
                        </Typography>
                        <Link color="text.secondary" href="/about">
                            About us
                        </Link>
                        <Link color="text.secondary" href="#">
                            Press
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            gap: 1,
                            alignItems: 'center',
                            marginLeft: offset, // Utiliser la variable offset pour décaler la boîte
                        }}
                    >
                        <Typography variant="body2" fontWeight={600}>
                            Legal
                        </Typography>
                        <Link color="text.secondary" href="/privacy">
                            Privacy
                        </Link>
                        <Link color="text.secondary" href="#">
                            Terms
                        </Link>
                        <Link color="text.secondary" href="#">
                            Contact
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            gap: 1,
                            alignItems: 'center',
                            marginLeft: offset, // Utiliser la variable offset pour décaler la boîte
                        }}
                    >
                        <Typography variant="body2" fontWeight={600}>
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <IconButton
                                    color="inherit"
                                    href="mailto:wizos.contact@gmail.com"
                                    aria-label="Email"
                                >
                                    <EmailIcon />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    href="https://github.com/Wizos"
                                    aria-label="GitHub"
                                >
                                    <FacebookIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <IconButton
                                    color="inherit"
                                    href="https://linkedin.com/company/wizos"
                                    aria-label="LinkedIn"
                                >
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    href="https://twitter.com/Wizos"
                                    aria-label="Twitter"
                                >
                                    <TwitterIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        borderColor: 'divider',
                    }}
                >
                    <div>
                        <Copyright />
                    </div>
                    <Box
                        sx={{
                            flexGrow: 0.02,
                            display: 'flex',
                            alignItems: 'center',
                            mb: '-4px',
                            px: 0,
                        }}
                    >
                        <a href="/">
                            <img
                                src='../../../grey_logo.png'
                                style={logoStyle}
                                alt="logo"
                            />
                        </a>
                    </Box>
                </Box>
            </Container>
        </footer>
    );
}
