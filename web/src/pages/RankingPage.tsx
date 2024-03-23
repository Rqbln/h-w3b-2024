import * as React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AppAppBar from '../landing-page/components/AppAppBar';
import getLPTheme from '../landing-page/getLPTheme';
import Footer from '../landing-page/components/Footer';
import { useState } from "react";

interface Row {
    name: string;
    score: number;
}

const createData = (name: string, score: number): Row => {
    return { name, score };
}

const rows: Row[] = [
    createData('tz1exempleUn', 159),
    createData('tz2exempleDeux', 237),
    createData('tz3exempleTrois', 262),
];

const RankingPage: React.FC = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const theme = createTheme(getLPTheme(mode));

    // Ajout de la fonction toggleColorMode
    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> {/* Mise à jour pour inclure toggleColorMode */}
            <Box sx={{ pt: 8, pb: 6 }}>
                <Typography variant="h2" gutterBottom>
                    Ranking Page
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
                                    <TableRow key={row.name}>
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
