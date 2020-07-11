const socket = io.connect('http://localhost:3030');

socket.emit('busConnection')

document.addEventListener('DOMContentLoaded',()=>{
    if(!navigator.geolocation){
        return alert('your device does not support GPS')
    }
    const success = (position) => {
        const {latitude,longitude}= position.coords;
        socket.emit('update',{
            latitude  : position.coords.latitude,
            longitude : position.coords.longitude,
            timestamp : position.timestamp
        })
        const lat =  document.querySelector("#lat");
        const long = document.querySelector("#lng");
        const map = document.querySelector("#map-link");

        map.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        
        map.textContent = `Click here to view on Map`;
        lat.textContent  = latitude;
        long.textContent = longitude;
    }
    const failure = (error) => {
        alert(`ERROR ${error.code} meaning ${error.message}`);
    }
    const options = {
        enableHighAccuracy: true, 
        maximumAge: 0,
    }
    const watchId = navigator.geolocation.watchPosition(success,failure,options)
})
