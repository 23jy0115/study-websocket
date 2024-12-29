const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
    },
});

const PORT = 3000;


app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('フロントエンドと接続しました');
    //フロントエンドから受信
    socket.on('send_message', (data) => {
        console.log(data);
        //フロントエンドへ送信
        io.emit('receive_message', data);
    });
    socket.on('disconnect', () => console.log('フロントエンドと切断しました')); 
});

server.listen(PORT, () => console.log(`サーバ起動中 => http://localhost:${PORT}`));