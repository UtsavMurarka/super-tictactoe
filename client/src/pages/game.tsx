import Grid from '../components/grid/grid'
import SocketProvider from '@/components/websocket/websocket'

export default function Game() {
  // TODO: handle showing sessionId with state
  return (
    <SocketProvider >
      <div>
        <Grid/>
        <div>
          Session ID: {sessionStorage.getItem("sessionId")}
        </div>
      </div>
    </SocketProvider>
  )
}