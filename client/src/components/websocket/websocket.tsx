import { createContext, useEffect, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContextProps } from "@/constants/game";

const initialiseSocket = () => {
    console.log("Socket connection initialised")
    return io("http://localhost:5000", {});
}

export const SocketContext = createContext<Socket>(initialiseSocket())

export default function SocketProvider(props:SocketContextProps) {
    var socket: Socket
    socket = useMemo(initialiseSocket, [])
    useEffect(() => {
        return () => {
            socket.close()
        };
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}
