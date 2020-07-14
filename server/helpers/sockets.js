import socketIO from 'socket.io';

let name;

export let io = socketIO(name);

      // store active busses 
const busses = [];

export const startSocket =(server) =>{
    io = socketIO(server);
    io.on('connection', socket => {
      // All User (Driver || Client)
      socket.emit("Your Id", socket.id)

      socket.on('busConnection', ({ id,routeNumber }) => {
        const bus = {
          id,
          lat: null,
          long: null,
          routeNumber,
        }
        busses.push(bus)
        // console.log("registered a bus",busses)
      })

      socket.on('update',(data)=>{
        console.log("Updated a bus",busses)
          for(const bus of busses){
              if(bus.id === socket.id){
                  bus.lat = data.latitude
                  bus.long = data.longitude
                  bus.routeNumber = data.routeNumber
                  break;
              }
          }
          // io.emit('locations',busses)
      })
  
      socket.on('disconnect', () => {
        // console.log("disconected a bus",busses)
          for (let i = 0; i < busses.length; i++) {
            if (busses[i].id === socket.id) {
              busses.splice(i, 1)
              break
            }
          }
      })

      // User connection 
      socket.on('getBusses',async ({ routeNumber }) => {
        const UserBusses =  busses.filter(bus=>bus.routeNumber === routeNumber )
        socket.emit('locations',UserBusses)
      })
    })
  }