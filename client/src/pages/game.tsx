import { useEffect, useState } from 'react'
import Grid from '../components/grid/grid'
import  SocketProvider, {getSocketContext} from '@/components/websocket/websocket';
import  {useTurnContext, isMyTurn} from '@/components/turnProvider/turnProvider';
import { threebythree } from "@/constants/game";
import { getInitialBoard } from '@/helper/gameUtils';

export default function Game() {
  // TODO: handle showing sessionId with state
  const [storage, setStorage] = useState<Storage>()
  
  useEffect(()=>{
    setStorage(sessionStorage)
    
  }, []); 
  const [boardState, setBoardState] = useState(getInitialBoard(threebythree.row));
  let {turn, setTurn} = useTurnContext()
  let socket = getSocketContext()
  if (!socket) {
    return;
  }
  socket.on('updateBoard', function(data) {
    const newBoardState = [...boardState];
    newBoardState[data.row][data.col] = data.player == 'player1' ? 0 : 1;
    setBoardState(newBoardState);
    setTurn(isMyTurn(data.player))
  })

  return (
      <SocketProvider>
        <div>
            <Grid boardState={boardState}/>
            <div>
              Player: {storage?.getItem('player')}
            </div>
            <div>
              SessionID: {storage?.getItem('sessionId')}
            </div>
            <div>
              {turn ? "your turn!!": "Wait, Its not your turn"}
            </div>
        </div>
      </SocketProvider>
  )
}