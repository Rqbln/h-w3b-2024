const axios = require('axios');

const fetchQuizz = async () => {
    try {
        // Assurez-vous que cette URL pointe vers votre API qui renvoie les données de quizz
        const response = await axios.get('http://localhost:3000/api/quizzs');
        const quizzs = response.data;

        console.log('Quizz récupérés :');
        quizzs.forEach((quizz, index) => {
            // Ici, vous pouvez choisir les attributs que vous voulez afficher
            console.log(`${index + 1}. Titre: ${quizz.titre}, Auteur: ${quizz.auteur}`);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des quizz:', error);
    }
};

fetchQuizz();
