const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json()); // Pour parser le JSON dans les requêtes

// Configuration de la connexion à la base de données
const sequelize = new Sequelize('Wiz_db', 'wizos', 'robino', {
    host: 'localhost',
    dialect: 'mysql'
});

// Définition du modèle Quizz
const QuizzModel = sequelize.define('Quizz', {
    titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    auteur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    theme: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { tableName: 'Quizzs' }); // Assurez-vous que le nom de la table correspond à ce que Sequelize attend

// Endpoint pour ajouter un quizz
app.post('/quizz', async (req, res) => {
    try {
        const { titre, auteur, theme } = req.body;
        const quizz = await QuizzModel.create({
            titre,
            auteur,
            theme,
            date: new Date()
        });
        return res.status(201).json(quizz);
    } catch (error) {
        console.error('Erreur lors de la création du quiz :', error);
        return res.status(500).json({ message: "Erreur lors de l'ajout du quizz" });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
