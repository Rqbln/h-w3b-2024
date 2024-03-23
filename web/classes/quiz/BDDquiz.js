const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
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

async function creerQuizz(titre) {
  const quizz = new Quizz(titre, new Date());
  await QuizzModel.create({ titre: quizz.titre, date: quizz.date });
}

async function obtenirTousLesQuizz() {
  const quizzs = await QuizzModel.findAll();
  return quizzs.map(quizz => new Quizz(quizz.titre, quizz.date));
}

module.exports = { creerQuizz, obtenirTousLesQuizz };