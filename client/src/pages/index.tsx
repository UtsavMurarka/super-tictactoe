import styles from './index.module.css'
import SocketProvider, { SocketContext } from '@/components/websocket/websocket';
import { useContext } from 'react';
import { useRouter } from 'next/router';

function welcomeChild() {
    let socket = useContext(SocketContext);
    const router = useRouter();

    socket.on('sessionCreated', function(data) {
        sessionStorage.setItem("sessionId", data.sessionId);
    })

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
    const baseStyle = styles.container
    return (
        <div className={baseStyle}>
            <div className={baseStyle.concat(" ", styles.newGame)}>
                <button className={styles.newGamebtn} onClick={handleCreateSession}>Create Session</button>
            </div>
            <h2 className={styles.divider}>OR</h2>
            <div className={baseStyle.concat(' ', styles.joinGame)}>
                <h2>Join an existing session</h2>
                <input  className={styles.input} type="text" id="name" name="name" onChange={(e) => handleInput(e)} onBlur={handleOnBlur} placeholder='session id'/>
                <button className={styles.joinGamebtn} onClick={handleJoinSession}>Join Session</button>
            </div>
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