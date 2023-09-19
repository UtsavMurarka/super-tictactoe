function updateBoardState(session, move) {
    var currSymbol = -1;
    if (move.player == "player1") {
        currSymbol = 0;
    } else if (move.player == "player2") {
        currSymbol = 1;
    }
    session.boardState[move['row']][move['col']] = currSymbol;
    session.lastMove = move;
    return session;
}


module.exports = {
    updateBoardState,
};