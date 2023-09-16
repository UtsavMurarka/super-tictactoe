import { threebythree } from "@/constants/game";
import Row from "../row/row";

export default function Grid() {
    let grid:JSX.Element[] = []
    let maxRows = threebythree.row
    for( let i=0; i<maxRows; i++) {
        grid.push(<Row key={i} row={i}/>)
    }
    return (
      <div>
        {grid}
      </div>
    )
  }