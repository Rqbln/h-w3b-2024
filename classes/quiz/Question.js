// Question.js

class Question {
    constructor(enonce, reponsesPossibles, weight = 1) {
      this._enonce = enonce;
      this._weight = weight;
      this._reponsesPossibles = reponsesPossibles.map(reponse, validite => ({
        texte: reponse,
        estVraie: validite,
        selectionnee: false
      }));
    }
  
    // Getter pour l'énoncé
    getEnonce() {
      return this._enonce;
    }
  
    // Getter pour les réponses possibles
    getReponsesPossibles() {
      return this._reponsesPossibles;
    }

    getWeight() {
      return this._weight;
    }
  
    // Méthode pour sélectionner une réponse
    selectionnerReponse(index) {
      this._reponsesPossibles[index].selectionnee = !this._reponsesPossibles[index].selectionnee;
    }

    getScoreQuestion() {
        let total = 0;
        this._reponsesPossibles.array.forEach(repPossible => {
            if (estVraie == selectionnee) {total++;}
        });
        return total/this._reponsesPossibles.length;
    }
  }

  export default Question;
  
  