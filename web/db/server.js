// Importation des modules nécessaires
const express = require('express');
const cors = require('cors');
const { getAllQuizz } = require('../classes/quiz/getQuizzs.js'); // Assurez-vous que le chemin d'accès est correct

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
    res.status(200).send({ status: 'Données reçues avec succès!' }); // Ajout du code de statut 200
});

// Route GET pour récupérer les quizz
app.get('/api/quizz', async (req, res) => {
    try {
        const quizzs = await getAllQuizz(); // Assurez-vous que getAllQuizz est une fonction asynchrone qui renvoie les quizz
        res.json(quizzs); // Envoie les quizzs au format JSON
    } catch (error) {
        res.status(500).send({ error: error.message }); // Envoie le message d'erreur avec le code de statut 500
    }
});

// Le serveur écoute sur le port 3000 ou sur le port défini dans la variable d'environnement PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
