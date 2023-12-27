import { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { ChildrenProps } from "@/constants/game";

const initialiseSocket = () => {
    console.log("Socket connection initialised")
    return io("http://localhost:5000", {});
}

const SocketContext = createContext<Socket | undefined>(undefined)

export default function SocketProvider(props:ChildrenProps) {
    const socket = useMemo(initialiseSocket, [])
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}

export const getSocketContext = ()=> {
    if (SocketContext === undefined) {
        console.error("Socket was uninitialised!")
        return undefined
    } else {
        return useContext(SocketContext);
    }
}
