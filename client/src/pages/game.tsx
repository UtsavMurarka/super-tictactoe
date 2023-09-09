import {io} from "socket.io-client";

export default function Game() {
  function handleClick() {
    console.log("Event emitted.")
    var socket = io("http://localhost:5000", {});
    let data = {name: "Buddy"};
    socket.emit('cellClick', data);
  }

  return (
    <div>
      <button onClick={handleClick}>Hello Buddy!</button>
    </div>
  )
}