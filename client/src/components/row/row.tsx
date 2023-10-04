import Cell from "../cell/cell";
import { RowProp, threebythree } from "@/constants/game";
import styles from './row.module.css'

export default function Row(props: RowProp) {
    let maxCols = threebythree.col
    let rowNum = props.row 
    let rowVal = props.rowValues;
    let row:JSX.Element[] = []
    for( let i=0; i<maxCols; i++) {
        row.push(<Cell key={rowNum + i} row={rowNum} col={i%maxCols} cellValue={rowVal[i]}/>)
    }
    return (
      <div className={styles.row}>
        {row}
      </div>
    )
  }