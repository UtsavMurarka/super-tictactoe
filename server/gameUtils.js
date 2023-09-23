var maxRows = 9;
var maxCols = 9;

function updateBoardState(session, move) {
    var currSymbol = -1;
    if (move.player == session.player1) {
        currSymbol = 0;
    } else if (move.player == session.player2) {
        currSymbol = 1;
    }
    session.boardState[move['row']][move['col']] = currSymbol;
    session.lastMove = move;
    return session;
}

function getInitialBoard() {
    var initialBoard = [];
    for (let i=0; i<maxRows; i++) {
        var temp = [];
        for(let j=0; j<maxCols; j++) {
            temp.push(-1);
        }
        initialBoard.push(temp);
    }
    return initialBoard;
}


module.exports = {
    updateBoardState,
    getInitialBoard
};