import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, alpha, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';

const createData = (name, score) => {
    return { name, score };
}

const rows = [
    createData('tz1exempleUn', 159),
    createData('tz2exempleDeux', 237),
    createData('tz3exempleTrois', 262),
];

const RankingPage = () => {
    const [mode, setMode] = useState('dark');
    const theme = createTheme(getLPTheme(mode));

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
                <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', fontSize: 'clamp(3rem, 10vw, 4rem)' }}>
                    Page&nbsp;
                    <Typography component="span" variant="h2" sx={{ fontSize: 'clamp(3rem, 10vw, 4rem)', color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.light', }}>
                        Ranking
                    </Typography>
                </Typography>
                <Container maxWidth="md">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Adresse Tezos</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                        <TableCell align="right">{row.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default RankingPage;
