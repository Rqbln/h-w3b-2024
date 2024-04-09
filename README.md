# h-w3b-2024

[**Vidéo de démonstration de la Plateforme**](web/public/preview_wizos.mp4)

## Description

Ce référentiel contient le code source de la plateforme Wizos développée lors du hackathon `H-W3B` en mars 2024. Wizos est une application proposant des formations / certifications décentralisées permettant de distinguer les meilleurs développeurs grâce à la blockchain, afin de leur offrir des opportunités professionnelles.

## Structure du répertoire

Le répertoire est organisé comme suit :

- `classes/`: Contient les classes et la logique métier spécifiques aux fonctionnalités de quiz de l'application.
- `db/`: Contient les scripts et configurations pour la base de données.
- `matchmaking/`: Contient la logique pour le système de matchmaking.
- `src/`: Contient le code source de l'application React.
    - `components/`: Contient les composants réutilisables de l'application.
    - `features/`: Contient des fonctionnalités spécifiques de l'application, comme les quiz.
    - `pages/`: Contient les différents composants de page de l'application.
    - `services/`: Contient les services utilisés dans l'application, comme les appels API.
    - `utils/`: Contient divers utilitaires et fonctions d'aide.
    - `theme/`: Contient le thème de toutes les pages de l'application React
- `public/`: Contient des fichiers statiques comme les images et les fichiers HTML.
- `hardhat/`: Ce sous-dossier est configuré pour le développement de contrats intelligents, utilisant Hardhat pour la compilation, le déploiement et le test de contrats sur Ethereum et potentiellement sur d'autres chaînes compatibles EVM.

## Installation et exécution

1. Assurez-vous d'avoir `Node.js` installé sur votre système.
2. Clonez ce référentiel sur votre machine locale.
3. Pour lancer l'application web :
    - Naviguez vers le dossier `web/`.
    - Exécutez `npm install` pour installer les dépendances.
    - Exécutez `npm start` pour démarrer l'application localement.
    - Accédez à `http://localhost:3000` dans votre navigateur pour utiliser la plateforme Wizos.
4. Pour travailler avec les contrats intelligents :
    - Naviguez vers le dossier `hardhat/`.
    - Exécutez `npm install` pour installer les dépendances de Hardhat.
    - Utilisez `npx hardhat compile` pour compiler les contrats, et `npx hardhat test` pour exécuter les tests.

## Licence

Ce projet est sous licence Apache-2.0. Consultez le fichier `LICENSE` pour plus de détails.
