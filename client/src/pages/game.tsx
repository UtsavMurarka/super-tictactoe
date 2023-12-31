import { useContext, useEffect, useState } from 'react'
import Grid from '../components/grid/grid'
import SocketProvider, {SocketContext} from '@/components/websocket/websocket';
import { threebythree } from "@/constants/game";
import { getInitialBoard } from '@/helper/gameUtils';

export default function Game() {
  // TODO: handle showing sessionId with state
  const [storage, setStorage] = useState<Storage>()
  useEffect(()=>{
    setStorage(sessionStorage)
  }, []);

  const [boardState, setBoardState] = useState(getInitialBoard(threebythree.row));

  let socket = useContext(SocketContext)
  socket.on('updateBoard', function(data) {
    console.log("aaaa");
    console.log(data);
    const newBoardState = [...boardState];
    newBoardState[data.row][data.col] = data.player == 'player1' ? 0 : 1;
    console.log(newBoardState);
    setBoardState(newBoardState);
  })
  return (
    <SocketProvider >
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