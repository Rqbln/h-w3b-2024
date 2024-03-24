import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, Container, Button, Fade, CircularProgress, LinearProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Confetti from 'react-confetti';
import AppAppBar from '../landing-page/components/AppAppBar';
import Footer from '../landing-page/components/Footer';
import getLPTheme from '../landing-page/getLPTheme';

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
    // Ajoutez d'autres questions selon vos souhaits
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const QuizzPage = () => {
    const [mode, setMode] = useState('dark');
    const theme = createTheme(getLPTheme(mode));
    const [loading, setLoading] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);

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
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
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
                {!showQuiz && !loading && (
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
                                <LinearProgress variant="determinate" value={(currentQuestion + 1) / questions.length * 100} sx={{ mt: 4 }} />
                            </Box>
                        </Fade>
                    </Container>
                )}
                {!showQuiz && !loading && currentQuestion === questions.length && (
                    <>
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            Quiz terminé ! Votre score est de {score} sur {questions.length}.
                        </Typography>
                        <Confetti />
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                                Félicitations ! Vous avez complété le quiz avec un score de {score} sur {questions.length}.
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

