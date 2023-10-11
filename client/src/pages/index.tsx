import SocketProvider, { SocketContext } from '@/components/websocket/websocket';
import { useContext } from 'react';
import { useRouter } from 'next/router';

function welcomeChild() {
    let socket = useContext(SocketContext);
    const router = useRouter();

    socket.on('sessionCreated', function(data) {
        sessionStorage.setItem("sessionId", data.sessionId);
    })

    function handleCellClick() {
        let data = {row: 0, col: 0};
        socket.emit('cellClick', data);
        console.log("Cell Click Event emitted.", data)
    }

    function handleCreateSession() {
        sessionStorage.setItem("player", "player1");
        
        socket.emit('createSession', {player: "player1"});
        console.log("Create session event emitted.");
        router.push('/game');
    }

    let sessionId = ''
    function handleInput(event: any) {
        sessionId = event.target.value;
    }
    function handleOnBlur(event: any) {
    }
    function handleJoinSession() {
        sessionStorage.setItem("player", "player2");
        console.log("Join session event emitted.", sessionId);
        socket.emit('joinSession', {sessionId: sessionId, player: "player2"});
        router.push('/game');
    }

    return (
        <div>
            <button onClick={handleCellClick}>Cell Click</button>
            <button onClick={handleCreateSession}>Create Session</button>
            <button onClick={handleJoinSession}>Join Session</button>
            <label htmlFor="name">Name (4 to 8 characters):</label>
            <input type="text" id="name" name="name" onChange={(e) => handleInput(e)} onBlur={handleOnBlur}/>
        </div>
    )
}

export default function Welcome() {
    return (
        <SocketProvider>
            {welcomeChild()}
        </SocketProvider>
    )
}