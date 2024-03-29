// Quizz.js

class Quizz {
    constructor(title, author, theme) {
      this._title = title;
      this._author = author;
      this._creationDate = newDate();
      this._theme = theme;
      this._questions = [];
    }
  
    getDateCreation() { 
        return this._creationDate;
    }

    getAuthor() { 
        return this._author;
    }

    getTitle() {
        return this._title;
    }

    getTheme() {
        return this._theme;
    }

    // Méthode pour ajouter une question
    addQuestion(question) {
        this._questions.push(question);
    }

    getPonderationTotale() {
        let res = 0;
        this._questions.forEach(question => {
            res+=question.getWeight();
        })
        return res;
    }

    getScoreQuizz() {
        let score = 0;
        this._questions.forEach(question => {
            score += question.getScoreQuestion() * question.getWeight();
        })
        return score/this.getPonderationTotale();
    }

  }
  
  export default Quizz;