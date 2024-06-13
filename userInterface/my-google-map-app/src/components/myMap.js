import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
// import Places from "./places";
// import Distance from "./distance";
import './myMap.css'
import Places from './places'
import Distance from "./distances";



// const libraries = ['places', 'geometry', 'drawing', 'visualization'];
// eslint-disable-next-line no-undef
const LatLngLiteral = google.maps.LatLngLiteral;
// eslint-disable-next-line no-undef
const DirectionsResult = google.maps.DirectionsResult;
// eslint-disable-next-line no-undef
const MapOptions = google.maps.MapOptions;

const mapContainerStyle = {
  width: '100%',
  height: '900px',
};
const center = {
    lat: 29.9868331, // Latitude for Cairo
    lng: 31.4387709, // Longitude for Cairo
};

  


const MyMap = () => {
    // eslint-disable-next-line no-undef
    const directionsRenderer = new google.maps.DirectionsRenderer();
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    
   
    const [directions, setDirections] = useState();
    const [office,setOffice] = useState()
    const [myLocation , setMyLocation] = useState();
    const [currentLocation, setCurrentLocation] = useState(null);
    const mapRef = useRef();
    const getLocationBtnRef = useRef(null);
    console.log("megomego " + localStorage.formData);
    console.log(localStorage.formData);

   
    const center = useMemo(() => ({ lat:30.0444, lng: 31.2357}), []);
        const options = useMemo(() => ({
            mapId : 'c66100078cd6e668',
            disableDefaultUI: true, 
            clickableIcons: false,
            styles: [
                ]
              
        }
        ),[]);
        
        const onLoad = useCallback((map) => { mapRef.current = map 
            // directionsRenderer.setMap(map);
            // directionsRenderer.setPanel(document.getElementById("sidebar"));
            // const control = document.getElementById("floating-panel");
            // // eslint-disable-next-line no-undef
            // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
        }, []);
        const fetchDirections = (currentLocation) => {
            if (!office) return;
             // eslint-disable-next-line no-undef
            const service = new google.maps.DirectionsService();
            service.route(
                {
                    origin: currentLocation,
                    destination: office,
                     // eslint-disable-next-line no-undef
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === "OK" && result) {
                        //directionsRenderer.setDirections(result);
                        console.log("hahahaha" + result);
                        console.log(result);

                        setDirections(result);
                    }
                }
            );
        };

        

        const onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        };

        
        

        const handleClick = () => {
            if (navigator.geolocation) {
                // Get the current location
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const currentLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation({ lat: latitude, lng: longitude });
                        mapRef.current?.panTo(currentLocation);
                        // document.getElementById("start").addEventListener("change", onChangeHandler);
                        // document.getElementById("end").addEventListener("change", onChangeHandler);
                        // calculateAndDisplayRoute(directionsService, directionsRenderer , position , currentLocation);
                    },
                    (error) => {
                        console.error("Error getting current location:", error);
                    }
                );
                
                const dataToSend = {
                    distance: localStorage.getItem('distance'),
                    // form: localStorage.getItem('form')
                };

                // Send data to Raspberry Pi server
                fetch('http://172.20.10.2:3000/receive_data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                .then(response => response.json())
                .then(data =>{
                    console.log('atb3tttt ahh')
                    console.log(data)
                } 
                )
                .catch((error) => {
                    console.error('Error sending data:', error);
                });
            
                console.log('ffffaaaa');
                console.log(localStorage.distance);

            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        function calculateAndDisplayRoute(directionsService, directionsRenderer , position , currentLocation) {
            const start = document.getElementById("start").value;
            const end = document.getElementById("end").value;
            console.log("start" + start);
            console.log("end" + end);
            // const start = currentLocation
            // const end = position

          
            directionsService
              .route({
                origin: start,
                destination: end,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.BICYCLING,
              })
              .then((response) => {
                directionsRenderer.setDirections(response);
              })
              .catch((e) => window.alert("Directions request failed due to "+e));
        }

        
        
  

        return (
            <div className="container">
              <div className="controls">
                <h1>Map For Smart Bike</h1>
                {/* <button id="get-location-btn">Get Current Location</button> */}
                <div>
                    <button ref={getLocationBtnRef} onClick={handleClick}>Get Current Location</button>
                 </div>
                 <br></br>
                 
                <Places setOffice={(position)=>{
                    setOffice(position)
                    mapRef.current?.panTo(position)
                }} />
                {!office && <p>Enter your office address to get directions</p>}
                {directions && <Distance leg={directions.routes[0].legs[0]} />}
              </div>
              <div className="map">
                <GoogleMap 
                  zoom={13}
                  center={center} 
                  mapContainerClassName='map-container' 
                  options={options}
                  onLoad={onLoad}
                >
                    {directions && (
                        <DirectionsRenderer
                        directions={directions}
                        options={{
                            polylineOptions: {
                            zIndex: 50,
                            strokeColor: "#1976D2",
                            strokeWeight: 5,
                            },
                        }}
                        />
                    )}
                    {office && (
                        <>
                            <Marker position={office} />
                            <Marker
                            position={currentLocation}
                            onClick={() => {
                                fetchDirections(currentLocation);
                            }}
                            />
                            <Circle center={office} radius={300} options={closeOptions} />
                            <Circle center={office} radius={550} options={middleOptions} />
                        </>
                        
                    )}
                    {currentLocation && <Marker position={currentLocation} 
                    />}

                    
                </GoogleMap>
              </div>
            </div>
          );
};
const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};
const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
};

const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
};

export default MyMap;
