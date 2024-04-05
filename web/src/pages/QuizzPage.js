import React, { useState } from 'react';
import {
    Box, CssBaseline, ThemeProvider, createTheme, Typography, Container,
    Button, Fade, CircularProgress, LinearProgress, Snackbar, Alert
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AppAppBar from '../landing-page/components/AppAppBar';
import Footer from '../landing-page/components/Footer';
import getLPTheme from '../landing-page/getLPTheme';

const QuizzPage = () => {
    const [mode, setMode] = useState('dark');
    const theme = createTheme(getLPTheme(mode));
    const [loading, setLoading] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [finalMessageDisplayed, setFinalMessageDisplayed] = useState(false);

    const questions = [
        {
            questionText: 'Quel est le mécanisme de consensus de Tezos?',
            answerOptions: [
                { answerText: 'Proof of Work', isCorrect: false },
                { answerText: 'Proof of Stake', isCorrect: false },
                { answerText: 'Liquid Proof of Stake', isCorrect: true },
            ],
        },
        {
            questionText: 'Quel langage est utilisé pour écrire des smart contracts sur Tezos?',
            answerOptions: [
                { answerText: 'Solidity', isCorrect: false },
                { answerText: 'Michelson', isCorrect: true },
                { answerText: 'Vyper', isCorrect: false },
            ],
        },
        {
            questionText: 'Qui est le créateur de Tezos?',
            answerOptions: [
                { answerText: 'Vitalik Buterin', isCorrect: false },
                { answerText: 'Arthur Breitman', isCorrect: true },
                { answerText: 'Dan Larimer', isCorrect: false },
            ],
        },
        {
            questionText: 'Quel est le token natif de Tezos?',
            answerOptions: [
                { answerText: 'XTZ', isCorrect: true },
                { answerText: 'BTC', isCorrect: false },
                { answerText: 'ETH', isCorrect: false },
            ],
        },
        {
            questionText: 'Dans quel langage Michelson est-il compilé?',
            answerOptions: [
                { answerText: 'JavaScript', isCorrect: false },
                { answerText: 'Liquidity', isCorrect: false },
                { answerText: 'SmartPy', isCorrect: true },
            ],
        },
    ];

    const startQuiz = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowQuiz(true);
        }, 2000);
    };

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowQuiz(false);
            setFinalMessageDisplayed(true); // Set final message flag
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={() => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))} />
            <Box sx={{ pt: 18, pb: 8, textAlign: 'center', width: '100%' }}>
                <Typography variant="h2" sx={{ mb: 2, color: theme.palette.text.primary }}>
                    Quiz Tezos
                </Typography>
                {!showQuiz && !loading && !finalMessageDisplayed && (
                    <Button variant="contained" color="secondary" onClick={startQuiz}>
                        Démarrer le Quiz
                    </Button>
                )}
                {loading && <CircularProgress />}
                {showQuiz && (
                    <Container maxWidth="sm">
                        <Fade in={true} timeout={1000}>
                            <Box>
                                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                                    Question {currentQuestion + 1}/{questions.length}
                                </Typography>
                                <Typography variant="h6">{questions[currentQuestion].questionText}</Typography>
                                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                                    <Button key={index} variant="outlined" color="primary" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} sx={{ display: 'block', mt: 2 }}>
                                        {answerOption.answerText}
                                    </Button>
                                ))}
                                <LinearProgress variant="determinate" value={(currentQuestion + 1) / questions.length * 100} sx={{ mt: 4, mb: 3 }} />
                            </Box>
                        </Fade>
                    </Container>
                )}
                {!showQuiz && finalMessageDisplayed && (
                    <>
                        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                            Quiz terminé ! Votre score est de {score} sur {questions.length}.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => setOpenSnackbar(true)}>
                            Soumettre le score
                        </Button>
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ display: 'flex', alignItems: 'center' }}>
                                <CheckCircleOutlineIcon sx={{ mr: 2 }} />
                                Félicitations ! Votre score de {score} sur {questions.length} a été soumis. Merci d'avoir participé.
                            </Alert>
                        </Snackbar>
                    </>
                )}
            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default QuizzPage;
