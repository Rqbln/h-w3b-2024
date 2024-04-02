// Spécifie la version de Solidity, le compilateur vérifie si le code est compatible avec cette version.
pragma solidity ^0.8.0;

// Définition du contrat, similaire à une classe dans d'autres langages de programmation.
contract SimpleStorage {
    // Déclare une variable `number` qui stockera un nombre.
    uint256 number;

    // Fonction pour stocker un nombre dans la variable `number`.
    // `public` rend la fonction accessible de l'extérieur du contrat.
    function store(uint256 num) public {
        number = num;
    }

    // Fonction pour récupérer la valeur stockée.
    // `view` indique que la fonction ne modifie pas l'état du contrat.
    // `returns` spécifie le type de retour de la fonction.
    function retrieve() public view returns (uint256){
        return number;
    }
}
