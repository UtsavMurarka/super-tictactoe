function updateBoardState(session, move) {
    var currSymbol = -1;
    if (session.lastMove == null) {
        currSymbol = 0;
    } else {
        var currSymbol = 1 - session.boardState[session.lastMove['row']][session.lastMove['col']];
    }
    session.boardState[move['row']][move['col']] = currSymbol;
    session.lastMove = move;
    return session;
}


module.exports = {
    updateBoardState,
};