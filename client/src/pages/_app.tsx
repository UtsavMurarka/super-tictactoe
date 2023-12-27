import type { AppProps } from 'next/app'
import SocketProvider from '@/components/websocket/websocket';
import TurnProvider from '@/components/turnProvider/turnProvider';
export default function MyApp({Component, pageProps}:AppProps) {
    return (
        <SocketProvider>
            <TurnProvider>
                <Component props={pageProps}/>
            </TurnProvider>
        </SocketProvider>
    )
}