const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let playerScores = [{ ws: null, score: null }, { ws: null, score: null }];
let currentPlayerIndex = 0;

console.log('Serveur WebSocket démarré sur le port 8080.');

const waitingPlayers = [];

wss.on('connection', function connection(ws) {
    console.log('Nouvelle connexion entrante.');

    if (currentPlayerIndex < 2) {
        playerScores[currentPlayerIndex].ws = ws;
        currentPlayerIndex++;
    }

    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        console.log('Message reçu:', data);

        if (data.type === 'findPlayer') {
            waitingPlayers.push(ws);
            console.log(`Joueur en attente ajouté. Nombre total de joueurs en attente: ${waitingPlayers.length}`);
            checkForMatch();
        } else if (data.type === 'score') {
            const playerIndex = playerScores.findIndex(p => p.ws === ws);
            if (playerIndex !== -1) {
                handleScoreMessage(playerIndex, data.score);
            }
        }
    });

    ws.on('close', () => {
        console.log('Connexion fermée.');
        const index = waitingPlayers.indexOf(ws);
        if (index > -1) {
            waitingPlayers.splice(index, 1);
            console.log(`Joueur retiré de la file d'attente. Nombre total de joueurs en attente: ${waitingPlayers.length}`);
        }
        currentPlayerIndex = Math.max(0, currentPlayerIndex - 1);
    });
});

function checkForMatch() {
    if (waitingPlayers.length >= 2) {
        // Deux joueurs sont trouvés, les retirer de la liste d'attente
        const player1 = waitingPlayers.shift();
        const player2 = waitingPlayers.shift();

        console.log('Match trouvé. Notifier les joueurs...');
        startMatch(player1, player2);
    }
}

function startMatch(player1, player2) {
    console.log("Démarrage d'un match entre deux joueurs.");

    // Initialiser playerScores avec les joueurs trouvés
    playerScores[0] = { ws: player1, score: null };
    playerScores[1] = { ws: player2, score: null };

    const message = JSON.stringify({ type: 'match' });
    player1.send(message);
    player2.send(message);
}


function handleScoreMessage(playerIndex, score) {
    playerScores[playerIndex].score = score;
    console.log(`Score reçu du joueur ${playerIndex}: ${score}`);

    if (playerScores[0].score !== null && playerScores[1].score !== null) {
        console.log('Les deux joueurs ont terminé. Comparaison des scores...');
        const results = compareScores();
        sendResults(results);
        resetScores();
    }
}

function compareScores() {
    if (playerScores[0].score > playerScores[1].score) {
        return ['Vous avez gagné', 'Vous avez perdu'];
    } else if (playerScores[0].score < playerScores[1].score) {
        return ['Vous avez perdu', 'Vous avez gagné'];
    } else {
        return ['égalité', 'égalité'];
    }
}

function sendResults(results) {
    playerScores.forEach((player, index) => {
        if (player.ws) {
            console.log(`Envoi des résultats au joueur ${index}`);
            player.ws.send(JSON.stringify({
                type: 'result',
                yourScore: playerScores[index].score,
                opponentScore: playerScores[1 - index].score,
                result: results[index]
            }));
        }
    });
}


function resetScores() {
    playerScores = [{ ws: null, score: null }, { ws: null, score: null }];
    currentPlayerIndex = 0;
}
