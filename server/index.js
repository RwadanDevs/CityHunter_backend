import http from 'http';
import app from './app';
import { startSocket } from './helpers/sockets';

 const server = http.createServer(app);

 const port = process.env.PORT || 3030;

 const listener = server.listen(port,()=>console.log(`running port ${port}`))

 startSocket(server);
