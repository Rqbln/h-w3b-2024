const { Sequelize, DataTypes } = require('sequelize');
// Remplacez 'mydatabase', 'myusername', et 'mypassword' par vos informations de connexion.
const sequelize = new Sequelize('Wiz_db', 'wizos', 'robino', {
  host: 'localhost',
  dialect: 'mysql'
});


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

async function creerQuizz(titre, auteur, theme) {
  const quizz = { titre, auteur, theme, date: new Date() };
  await QuizzModel.create(quizz);
}

async function obtenirTousLesQuizz() {
  return await QuizzModel.findAll();
}

module.exports = { creerQuizz, obtenirTousLesQuizz };
