import styles from './cell.module.css'
import { CellProp, threebythree } from "@/constants/game";
import { getSocketContext } from '../websocket/websocket';
import { useContext, useEffect, useState } from 'react';
import { useTurnContext } from '../turnProvider/turnProvider';
export default function Cell(prop: CellProp) {
  const [storage, setStorage] = useState<Storage>()
  const { turn, setTurn } = useTurnContext()
  useEffect(()=>{
    setStorage(sessionStorage)
  }, [])
  let {row, col, cellValue}  = prop
  let socket = getSocketContext();
  let player = storage?.getItem('player');
  function handleClick() {
    let sessionId = storage?.getItem('sessionId');
    if(!turn) {
      console.log("not yout turn yet!")
      return;
    }
    let data = {row, col, player, sessionId};
    console.log("Event emitted.", data)
    if (socket === undefined) {
      console.error("socket connection not found")
      return
    }
    socket.emit('cellClick', data);
    setTurn(!turn)
  }
  let {row: maxRow, col: maxCols} = threebythree
  let clname = styles.cell
  if (row == 0) {
    clname = clname.concat(" ",styles["top-row"])
  }
  if (row == maxRow-1) {
    clname = clname.concat(" ",styles["bottom-row"])
  }
  if (col == 0) {
    clname = clname.concat(" ",styles["leftmost-col"])
  }
  if (col == maxCols - 1) {
    clname = clname.concat(" ",styles["rightmost-col"])
  }

  return (
    <div onClick={handleClick} className={clname}>
      {cellValue == -1 ? '' : (cellValue == 0 ? 'X' : 'O')}
    </div>
  )
}