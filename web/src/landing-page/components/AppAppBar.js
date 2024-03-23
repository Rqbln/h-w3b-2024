import React, { useState, useEffect } from 'react';
import { useTheme, IconButton, Avatar, Button, Box, AppBar, Toolbar, Container, Typography, MenuItem } from '@mui/material';
import { connectWallet, checkIfWalletConnected, getBalance } from '../../services/walletService';
import ToggleColorMode from './ToggleColorMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const logoStyle = {
    width: '35px',
    height: '40px',
    cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
    const [elevateAppBar, setElevateAppBar] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const initWallet = async () => {
            const address = await checkIfWalletConnected();
            if (address) {
                setWalletAddress(address);
                const balance = await getBalance(address);
                setWalletBalance(balance);
            }
        };

        window.addEventListener('scroll', () => setElevateAppBar(window.scrollY > 0));
        initWallet();
        return () => window.removeEventListener('scroll', () => setElevateAppBar(window.scrollY > 0));
    }, []);

    const handleConnectWallet = async () => {
        const address = await connectWallet();
        if (address) {
            setWalletAddress(address);
            const balance = await getBalance(address);
            setWalletBalance(balance);
        }
    };

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
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'left' }}>
                            <MenuItem component="a" href="/quizz">
                                <Typography variant="body2" color="text.primary">
                                    Duel
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
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        {walletAddress ? (
                            <>
                                <Typography variant="body2">{`${walletBalance} XTZ`}</Typography>
                                <IconButton href="/account" size="small">
                                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                        <AccountCircleIcon fontSize="small" />
                                    </Avatar>
                                </IconButton>
                                <Typography variant="body2">{`${walletAddress.slice(0, 10)}...`}</Typography>
                            </>
                        ) : (
                            <Button color="secondary" variant="contained" onClick={handleConnectWallet}>
                                Connect Wallet
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppAppBar;
