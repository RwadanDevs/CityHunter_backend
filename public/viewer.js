const socket = io.connect('http://localhost:3030');
let myId,routeNumber=205;

const mesure = async (bus) => {
  const { lat,long } = bus;
  let originLat = -1.975803;
  let originLong =  30.072502;
  const response =  await fetch('http://localhost:3030/api/v1/locations',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      originLat,
      originLong,
      destinationLat : lat,
      destinationLong : long,
    })
  })
  const data =  await response.json()

  document.querySelector('#time').innerHTML=` Your Bus is ${data.data.duration.text} out`;
}

socket.on('locations',data=>{
  if(data[0]){
    document.querySelector("#busses").innerHTML = data.length;
    mesure(data[0]);
  }
})

socket.on("Your Id",data =>{
   myId = data
   document.querySelector("#demo").innerHTML = ` Your Id <span style="background:whitesmoke;padding:5px;border-radius:10px;">${myId}<span>`
  })

const init = () => {
  const authType = document.querySelector('div > input').value;

  if(authType === "user"){
    getInfo(205)
  }else if(authType === 'driver'){
    giveInfo(205)
  }else{
    return alert("Auth Error")
  }
}

const getInfo = (routeNumber) => {
  setInterval(() => {
    socket.emit('getBusses',{
      routeNumber,
    })
  }, 2000);
}

const giveInfo = (routeNumber) => {
  socket.emit('busConnection',{
    id:myId,
    routeNumber,
  })
  setTimeout(sendLocation(routeNumber),2000)
}

const sendLocation = (routeNumber) =>{
      if(!navigator.geolocation){
          return alert('your device does not support GPS')
      }

    const success = (position) => {
        const {latitude,longitude}= position.coords;
        socket.emit('update',{
            latitude,
            longitude,
            routeNumber,
        })
    }

    const failure = (error) => {
        alert(`ERROR ${error.code} meaning ${error.message}`);
    }

    const options = {
        enableHighAccuracy: true, 
        maximumAge: 0,
    }

    navigator.geolocation.watchPosition(success,failure,options)
}


