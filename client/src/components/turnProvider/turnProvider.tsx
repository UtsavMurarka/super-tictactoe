import { createContext, useState, useMemo } from "react";
import { ChildrenProps } from "@/constants/game";
import { Dispatch, SetStateAction } from "react";
export const isMyTurn = (lastPlayer:string) => {
    return lastPlayer !== sessionStorage.getItem('player')
}

const [turn, setTurn] = useState(false)
interface TurnContextProps {
    myValue: boolean,
    setMyValue: Dispatch<SetStateAction<boolean>>
  }
export const TurnContext = createContext<TurnContextProps>(turn, setTurn)

export default function TurnProvider(props:ChildrenProps) {
    return (
        <TurnContext.Provider turn={turn} setTurn={setTurn}>
            {props.children}
        </TurnContext.Provider>
    )
}
