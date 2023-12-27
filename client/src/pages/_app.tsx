import type { AppProps } from 'next/app'
import SocketProvider from '@/components/websocket/websocket';
export default function MyApp({Component, pageProps}:AppProps) {
    return (
        <SocketProvider>
            <Component props={pageProps}/>
        </SocketProvider>
    )
}