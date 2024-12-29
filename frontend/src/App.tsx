import { useState } from 'react';
import './App.css'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

function App() {
  const [msg, setMsg] = useState("");
  const [list, setList] = useState<{msg: string}[]>([]);

  const handleSendMsg = () => {
    //サーバーにメッセージを送信する処理
    socket.emit("send_message", {msg: msg});
    setMsg("");
  };

  socket.on("receive_message", (data) => {
    console.log(data);
    setList([...list, data]);
  });

  return (
    <div className="container">
      <div className="container">
        <h2>Websocketを使用したチャットアプリ</h2>
        <div className="chatInputButton">
          <input type="text" placeholder="チャット..." onChange={ (e) => setMsg(e.target.value)} value={msg}  />
          <button onClick={ () =>  handleSendMsg()}>チャット送信</button>
        </div>
        {list.map((chat, index) => (
          <div className="chatArea" key={index}>
            {chat.msg}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
