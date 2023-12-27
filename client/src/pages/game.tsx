import { useContext, useEffect, useState } from 'react'
import Grid from '../components/grid/grid'
import SocketProvider, {getSocketContext} from '@/components/websocket/websocket';
import { threebythree } from "@/constants/game";
import { getInitialBoard } from '@/helper/gameUtils';

export default function Game() {
  // TODO: handle showing sessionId with state
  const [storage, setStorage] = useState<Storage>()
  
  useEffect(()=>{
    setStorage(sessionStorage)
    
  }, []); 
  const [boardState, setBoardState] = useState(getInitialBoard(threebythree.row));
  

  let socket = getSocketContext()
  if (socket === undefined) {
    console.log("no socket")
    return
  }
  socket.on('updateBoard', function(data) {
    const newBoardState = [...boardState];
    newBoardState[data.row][data.col] = data.player == 'player1' ? 0 : 1;
    setBoardState(newBoardState);
  })

  return (
    <SocketProvider>
    <div>
      <Grid boardState={boardState}/>
      {
        <div>
          Player: {storage?.getItem('player')}
          SessionID: {storage?.getItem('sessionId')}
        </div>
      }
    </div>
    </SocketProvider>
  )
}