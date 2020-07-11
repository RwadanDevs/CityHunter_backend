import socketIO from 'socket.io';

let name;

export let io = socketIO(name);

export const startSocket =(server) =>{
     io = socketIO(server);
     io.on('connection', socket => {
        console.log('user connected');
        socket.emit('new-notification', {
          busses:['Welcome Order A Bus']
          });
      });
};