export function getInitialBoard(maxRows: number) {
    var initialBoard = [];
    for (let i=0; i<maxRows; i++) {
        var temp = [];
        for(let j=0; j<maxRows; j++) {
            temp.push(-1);
        }
        initialBoard.push(temp);
    }
    return initialBoard;
  }