import * as React from 'react';
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
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};

interface AppAppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
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
                            <img
                                src={
                                    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                                }
                                style={logoStyle}
                                alt="logo"
                            />
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
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                            <Button
                                color="primary"
                                variant="text"
                                size="small"
                                component="a"
                                href="/signin"  // Adjust the href based on your routing
                            >
                                Sign in
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                component="a"
                                href="/signup"  // Adjust the href based on your routing
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
