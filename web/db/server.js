// Importation des modules nécessaires
const express = require('express');
const cors = require('cors');
const { getAllQuizz } = require('../classes/quiz/getQuizzs.js');

// Création d'une nouvelle application express
const app = express();

// Utilisation de middleware CORS pour permettre des requêtes cross-origin
app.use(cors());

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Un exemple de route GET
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express!');
});

// Un exemple de route POST
app.post('/data', (req, res) => {
    console.log(req.body); // Affiche les données reçues dans la console
    res.send({ status: 'Données reçues avec succès!' });
});

app.get('/api/quizz', async (req, res) => {
    try {
        const quizzs = await getAllQuizz();
        res.json(quizzs);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Le serveur écoute sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});