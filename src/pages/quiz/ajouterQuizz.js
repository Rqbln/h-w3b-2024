const { Sequelize, DataTypes } = require('sequelize');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
});

// Fonction pour créer un quizz
async function creerQuizz(titre, auteur, theme) {
    try {
        await sequelize.sync();
        const quizz = await QuizzModel.create({ titre, auteur, theme, date: new Date() });
        console.log('Quizz créé avec succès:', quizz.toJSON());
    } catch (error) {
        console.error('Erreur lors de la création du quizz:', error);
    } finally {
        sequelize.close();
    }
}

// Fonction pour demander les informations du quizz
function demanderInformationsQuizz() {
    rl.question('Titre du quizz : ', (titre) => {
        rl.question('Auteur du quizz : ', (auteur) => {
            rl.question('Thème du quizz : ', (theme) => {
                creerQuizz(titre, auteur, theme);
                rl.close();
            });
        });
    });
}

demanderInformationsQuizz();
