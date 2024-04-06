import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, MenuItem,Typography, Container, Button, Fade, CircularProgress, LinearProgress} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AppAppBar from '../landing-page/components/AppAppBar';
import Footer from '../landing-page/components/Footer';
import getLPTheme from '../landing-page/getLPTheme';
import { useNavigate } from 'react-router-dom';

const QuizzPage = () => {
    const [mode, setMode] = useState('dark');
    const theme = createTheme(getLPTheme(mode));
    const [loading, setLoading] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [, setOpenSnackbar] = useState(false);
    const [finalMessageDisplayed, setFinalMessageDisplayed] = useState(false);
    const [ws, setWs] = useState(null);
    const [opponentScore, setOpponentScore] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const navigate = useNavigate();

    const handleReturnToDuels = () => {
        window.location.href = '/quizz';
    };

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080');
        setWs(websocket);

        websocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        websocket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log('Message received:', data);
            if (data.type === 'match') {
                setShowQuiz(true);
                setLoading(false);  // Arrêtez le chargement une fois que le match commence.
            } else if (data.type === 'result') {
                setFinalMessageDisplayed(true);
                setShowQuiz(false);
                setOpponentScore(data.opponentScore);
                setResultMessage(data.result);
                setLoading(false);  // Arrêtez le chargement une fois que les résultats sont reçus.
            }
        };



        return () => {
            websocket.close();
        };
    }, []);

    const findPlayer = () => {
        const message = JSON.stringify({ type: 'findPlayer' });
        ws.send(message);
        setLoading(true);
    };


    const handleAnswerOptionClick = (isCorrect) => {
        const nextScore = isCorrect ? score + 1 : score;
        setScore(nextScore);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowQuiz(false);
            setFinalMessageDisplayed(true);
            // Attendre que le score soit mis à jour avant d'envoyer
            setTimeout(() => {
                ws.send(JSON.stringify({ type: 'score', score: nextScore }));
            }, 100); // Une légère temporisation pour s'assurer que l'état est mis à jour
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={() => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))} />
            <Box sx={{ pt: 18, pb: 8, textAlign: 'center', width: '100%' }}>
                {!showQuiz && !loading && (
                    <Button variant="contained" color="secondary" onClick={findPlayer}>
                        Trouver un adversaire
                    </Button>
                )}
                {loading && !showQuiz && <CircularProgress />}
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
                {finalMessageDisplayed && (
                    <>
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            Quiz terminé ! Votre score est de {score}.{opponentScore !== null ? ` Score de l'adversaire : ${opponentScore}.` : ' Score de l\'adversaire en attente...'}
                        </Typography>
                        {opponentScore !== null && (
                            <>
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    {resultMessage}
                                </Typography>
                                <Button variant="contained" color="secondary" onClick={handleReturnToDuels}>
                                    Retour aux Duels
                                </Button>
                            </>
                        )}
                    </>
                )}





            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default QuizzPage;