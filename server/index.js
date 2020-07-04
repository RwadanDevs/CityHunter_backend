import http from 'http';
import app from './app';
import socket from 'socket.io';

 const server = http.createServer(app);

 const port = process.env.PORT || 3030;

 const listener = server.listen(port,()=>console.log(`running port ${port}`))

 const io = socket(listener)
