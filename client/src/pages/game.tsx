import { useContext, useEffect, useState } from 'react'
import Grid from '../components/grid/grid'
import SocketProvider, {SocketContext} from '@/components/websocket/websocket'
export default function Game() {
  // TODO: handle showing sessionId with state
  const [storage, setStorage] = useState<Storage>()
  useEffect(()=>{
    setStorage(sessionStorage)
  }, [])

  let socket = useContext(SocketContext)
  socket.on('updateBoard', function(data) {
    console.log("board state updated: ",data)
  })
  return (
    <SocketProvider >
      <div>
        <Grid/>
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