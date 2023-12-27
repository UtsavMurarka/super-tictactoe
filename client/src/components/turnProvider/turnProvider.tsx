import { createContext, useState, useContext } from "react";
import { ChildrenProps } from "@/constants/game";
import { Dispatch, SetStateAction } from "react";
import { error } from "console";
export const isMyTurn = (lastPlayer:string | null | undefined) => {
    return lastPlayer !== sessionStorage.getItem('player')
}

interface TurnContextProps {
    turn: boolean,
    setTurn:  Dispatch<SetStateAction<boolean>>
}
const TurnContext = createContext<TurnContextProps | undefined>(undefined)

export default function TurnProvider(props:ChildrenProps) {
    const [turn, setTurn] = useState(false)
    const handleTurnChange = (turn: SetStateAction<boolean>) => {
        console.log('changing turn value from ', turn, 'to ', !turn );
        setTurn(turn)
    }
    return (
        <TurnContext.Provider value={{turn, setTurn: (turn)=>handleTurnChange(turn)}}>
            {props.children}
        </TurnContext.Provider>
    )
}

export const useTurnContext = () => {
    const turnContext = useContext(TurnContext)
    if (turnContext === undefined) {
        console.error('turnContext is not initialised');
        return {turn: null, setTurn: ()=>{}}
    }
    return turnContext
} 