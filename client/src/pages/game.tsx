import Grid from '../components/grid/grid'
import SocketProvider from '@/components/websocket/websocket'

export default function Game() {
  return (
    <SocketProvider >
        <Grid/>
    </SocketProvider>
  )
}