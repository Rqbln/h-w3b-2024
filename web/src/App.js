import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connection } from './solanaConfig'; // Importez la configuration Solana
import { sendTransaction } from './solanaActions'; // Importez la fonction d'action Solana
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import QuizzPage from "./pages/QuizzPage";
import RankingPage from "./pages/RankingPage";
import PrivacyPage from "./pages/PrivacyPage";
import './App.css';

function App() {
    // Exemple de fonction pour envoyer une transaction
    // Vous devriez intégrer une logique pour obtenir les adresses et les montants réels
    const handleSendTransaction = async () => {
        const fromPubkey = 'VotreAdressePublique';
        const toPubkey = 'AdresseDestination';
        const lamports = 1000; // Montant à envoyer

        try {
            await sendTransaction(connection, fromPubkey, toPubkey, lamports);
            console.log('Transaction envoyée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la transaction', error);
        }
    };

    // Vous pouvez appeler handleSendTransaction() depuis n'importe où dans votre application
    // Par exemple, vous pouvez passer cette fonction aux composants qui nécessitent une interaction avec Solana

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/quizz" element={<QuizzPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/ranking" element={<RankingPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
        </Router>
    );
}

export default App;
