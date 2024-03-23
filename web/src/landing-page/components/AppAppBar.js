import React, { useState, useEffect } from 'react';
import { PaletteMode, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ToggleColorMode from './ToggleColorMode';

const logoStyle = {
    width: '35px',
    height: '40px',
    cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
    const [elevateAppBar, setElevateAppBar] = useState(false);
    const theme = useTheme();

    const handleScroll = () => {
        setElevateAppBar(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', mt: 2 }}>
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: elevateAppBar ? theme.palette.background.paper : 'transparent',
                            backdropFilter: elevateAppBar ? 'blur(20px)' : 'none',
                            opacity: elevateAppBar ? 1 : 1,
                            transition: 'background-color 0.3s, opacity 0.3s, backdrop-filter 0.3s',
                        }}
                    >

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                px: 0,
                            }}
                        >
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
                                        src='../../../logo.png'
                                        style={logoStyle}
                                        alt="logo"
                                    />
                                </a>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' },
                                justifyContent: 'left',  }}>
                                <MenuItem component="a" href="/quizz">
                                    <Typography variant="body2" color="text.primary">
                                        Quizz
                                    </Typography>
                                </MenuItem>
                                <MenuItem component="a" href="/ranking">
                                    <Typography variant="body2" color="text.primary">
                                        Ranking
                                    </Typography>
                                </MenuItem>
                                <MenuItem component="a" href="/about">
                                    <Typography variant="body2" color="text.primary">
                                        About
                                    </Typography>
                                </MenuItem>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                color="secondary"
                                variant="text"
                                size="small"
                                component="a"
                                href="/signin"
                            >
                                Sign in
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                size="small"
                                component="a"
                                href="/signup"
                            >
                                Sign up
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    );
}

export default AppAppBar;
