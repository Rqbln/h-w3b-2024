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

// Fonction générateur pour renvoyer toutes les instances de quizz sous forme d'itérable
async function* getAllQuizz() {
    try {
        const quizzs = await QuizzModel.findAll();
        for (let quizz of quizzs) {
            yield quizz.toJSON(); // Utilisation de yield pour retourner chaque instance de quizz
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des quizz:', error);
    } finally {
        await sequelize.close(); // Fermeture de la connexion après récupération
    }
}

// Exportation de la fonction générateur
module.exports = { getAllQuizz };

// Exemple d'utilisation du générateur
(async () => {
    const quizzIterator = getAllQuizz();
    for await (let quizz of quizzIterator) {
        console.log(quizz); // Affichage de chaque quizz
    }
})();
