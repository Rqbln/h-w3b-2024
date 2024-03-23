import React from 'react';
import { PaletteMode } from '@mui/material';
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
    height: 'auto',
    cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            {/* Envelopper l'image du logo avec un élément <a> */}
                            <a href="/">
                                <img
                                    src='../../../logo.png'
                                    style={logoStyle}
                                    alt="logo"
                                />
                            </a>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                            {/*<ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />*/}
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
        </div>
    );
}

export default AppAppBar;
