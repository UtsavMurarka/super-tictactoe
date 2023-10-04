import { threebythree } from "@/constants/game";
import Row from "../row/row";
import { GridProp } from "@/constants/game";

export default function Grid(props: GridProp) {
    let {boardState} = props;
    let grid:JSX.Element[] = []
    let maxRows = threebythree.row;
    console.log("in grid", boardState);
    for( let i=0; i<maxRows; i++) {
        grid.push(<Row key={i} row={i} rowValues={boardState[i]}/>)
    }
    return (
      <div>
        {grid}
      </div>
    )
  }