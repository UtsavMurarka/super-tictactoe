const express = require("express");
const socket = require("socket.io");
const { updateBoardState } = require("./gameUtils");

const INITIAL_BOARD_STATE = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1]
];

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


const players = new Map()
const sessions = new Map();
io.on("connection", function (socket) {
    console.log("Made socket connection", socket.id);
    // let playerId = socket.id;
    // let currPlayer;
    // if (!players.has(playerId)) {
    //     let newPlayer = {
    //         playerId: playerId,
    //         symbol: null,
    //         sessionId: null
    //     };
    //     players.set(playerId, newPlayer);
    //     currPlayer = newPlayer;
    // } else {
    //     currPlayer = players.get(playerId);
    // }

    socket.on("createSession", function (data) {
        let playerId = data.player;
        console.log("createSession", data, playerId);
        let sessionId = Math.random().toString(36).substring(2, 7);
        let newSession = {
            sessionId: sessionId,
            player1: playerId,
            player2: null,
            player1Moves: [],
            player2Moves: [],
            boardState: INITIAL_BOARD_STATE,
            lastMove: null,
        }
        sessions.set(sessionId, newSession);
        socket.emit('sessionCreated', {sessionId: sessionId});
        console.log("New Session Created ", newSession);
        // currPlayer.sessionId = sessionId;
    });

    socket.on("joinSession", function (data) {
        let playerId = data.player;
        console.log("joinSession", data, playerId);
        let sessionIdToJoin = data.sessionId;
        if (sessions.has(sessionIdToJoin)) {
            let session = sessions.get(sessionIdToJoin);
            if (session.player1 === playerId) {
                socket.emit('exception', {errorMessage: 'Session already joined'});
                console.log('Session already joined')
            } else if (session.player2 != null) {
                socket.emit('exception', {errorMessage: 'Session is full'});
                console.log('Session is full')
            } else {
                session.player2 = playerId;
                // currPlayer.sessionId = sessionIdToJoin;
                console.log('Successfully joined session', session);
                socket.emit('sessionCreated', {sessionId: sessionIdToJoin});
            }
        } else {
            socket.emit('exception', {errorMessage: 'Invalid sessionId. Create a new session'});
            console.log('Invalid sessionId. Create a new session')
        }
    });

    socket.on("cellClick", function (data) {
        let playerId = data.player;
        console.log("cellClick", data, playerId);
        // let sessionId = currPlayer.sessionId;
        let sessionId = data.sessionId;
        if (!sessions.has(sessionId)) {
            socket.emit('exception', {errorMessage: 'No session found for sessionId' + sessionId});
            console.log('No session found for sessionId ' + sessionId);
        } else {
            let session = sessions.get(sessionId);
            if (session.player1 === playerId) {
                session.player1Moves.push(data);
                session = updateBoardState(session, data);
            } else if (session.player2 === playerId) {
                session.player2Moves.push(data);
                session = updateBoardState(session, data);
            } else {
                socket.emit('exception', {errorMessage: 'No player found corresponding to playerId: ' + playerId});
            }
            console.log(session);
        }
    });

    socket.on('disconnect', () => {
        socket.removeAllListeners();
     });
});