const { Sequelize } = require('sequelize');

// Configuration de la connexion à la base de données
const sequelize = new Sequelize('Wiz_db', 'wizos', 'robino', {
  host: 'localhost',
  dialect: 'mysql'
});

async function testerConnexion() {
  try {
    await sequelize.authenticate();
    console.log('La connexion à la base de données a été établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  } finally {
    await sequelize.close(); // Fermeture de la connexion
  }
}

testerConnexion();
