const { Sequelize, DataTypes } = require('sequelize');

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
}, {
    tableName: 'quizzs',
    timestamps: false
});

// Fonction pour afficher les titres de tous les quizz
async function afficherTitresQuizz() {
    try {
        const quizzs = await QuizzModel.findAll({ attributes: ['titre'] });
        quizzs.forEach(quizz => {
            console.log(quizz.titre);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des titres des quizz:', error);
    } finally {
        await sequelize.close(); // Fermeture de la connexion après récupération
    }
}

// Fonction pour afficher toutes les instances de quizz
async function afficherTousLesQuizz() {
    try {
        const quizzs = await QuizzModel.findAll();
        quizzs.forEach(quizz => {
            console.log(quizz.toJSON()); // Affichage des quizz dans la console
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des quizz:', error);
    } finally {
        await sequelize.close(); // Fermeture de la connexion après récupération
    }
}

// Exportation des fonctions
module.exports = { afficherTitresQuizz, afficherTousLesQuizz };

// Pour tester les fonctions, décommentez les lignes suivantes :
// afficherTitresQuizz();
afficherTousLesQuizz();
