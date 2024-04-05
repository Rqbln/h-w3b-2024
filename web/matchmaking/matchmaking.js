const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const waitingPlayers = [];

wss.on('connection', function connection(ws) {
    console.log('Nouvelle connexion entrante.');

    // Ajouter le joueur en attente de match
    waitingPlayers.push(ws);
    console.log('Joueur en attente ajouté. Nombre total de joueurs en attente :', waitingPlayers.length);

    // Afficher le nombre de joueurs en attente dans la console
    console.log('Joueurs en attente :', waitingPlayers.length);

    // Vérifier si un match peut être créé
    if (waitingPlayers.length >= 2) {
        const player1 = waitingPlayers.shift();
        const player2 = waitingPlayers.shift();
        startMatch(player1, player2);
    }

    ws.on('message', function incoming(message) {
        console.log('Message reçu : %s', message);
        // Gérer les messages des joueurs si nécessaire
    });
});

function startMatch(player1, player2) {
    console.log("Démarrage d'un match entre deux joueurs.");
    // Notifier les deux joueurs
    player1.send('Joueur trouvé !');
    player2.send('Joueur trouvé !');
    // Vous pouvez étendre la logique ici pour gérer le déroulement du match
}

