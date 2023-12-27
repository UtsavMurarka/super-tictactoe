import  { getSocketContext } from '@/components/websocket/websocket';
import { useTurnContext } from '@/components/turnProvider/turnProvider';
import { useRouter } from 'next/router';

export default function welcomeChild() {
    let socket = getSocketContext();
    const {setTurn} = useTurnContext()
    const router = useRouter();
    if (socket === undefined) {
        return <div>Undefined socket</div>
    }
    socket.on('sessionCreated', function(data) {
        sessionStorage.setItem("sessionId", data.sessionId);
    })

    function handleCellClick() {
        let data = {row: 0, col: 0};
        if (socket === undefined) {
            console.log("no socket")
            return
        }
        socket.emit('cellClick', data);
        console.log("Cell Click Event emitted.", data)
    }

    function handleCreateSession() {
        sessionStorage.setItem("player", "player1");
        if (socket === undefined) {
            console.log("no socket")
            return
        }
        socket.emit('createSession', {player: "player1"});
        console.log("Create session event emitted.");
        setTurn(true)
        router.push('/game');
    }

    let sessionId = ''
    function handleInput(event: any) {
        sessionId = event.target.value;
    }

    function handleJoinSession() {
        sessionStorage.setItem("player", "player2");
        console.log("Join session event emitted.", sessionId);
        if (socket === undefined) {
            console.log("no socket")
            return
        }
        socket.emit('joinSession', {sessionId: sessionId, player: "player2"});
        setTurn(false)
        router.push('/game');
    }

    return (
        <div>
            <button onClick={handleCellClick}>Cell Click</button>
            <button onClick={handleCreateSession}>Create Session</button>
            <button onClick={handleJoinSession}>Join Session</button>
            <label htmlFor="name">Name (4 to 8 characters):</label>
            <input type="text" id="name" name="name" onChange={(e) => handleInput(e)} onBlur={()=>{}}/>
        </div>
    )
}
