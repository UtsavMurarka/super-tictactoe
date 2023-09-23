import styles from './cell.module.css'
import { CellProp, threebythree } from "@/constants/game";
import { SocketContext } from '../websocket/websocket';
import { useContext, useEffect, useState } from 'react';

export default function Cell(prop: CellProp) {
  const [storage, setStorage] = useState<Storage>()
  useEffect(()=>{
    setStorage(sessionStorage)
  }, [])
  let {row, col}  = prop
  let socket = useContext(SocketContext);
  let player = storage?.getItem('player');

  function handleClick() {
    let sessionId = storage?.getItem('sessionId');
    let data = {row, col, player, sessionId};
    console.log("Event emitted.", data)
    if (!socket) {
      console.error("socket connection not found")
    }
    socket.emit('cellClick', data);
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
      
    </div>
  )
}