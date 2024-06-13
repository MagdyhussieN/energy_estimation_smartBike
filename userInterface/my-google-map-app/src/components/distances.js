import { useEffect , useState } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
// import { doc, setDoc } from "firebase/firestore";  // Import these functions
// import { db } from './firebaseConfig';  // Assuming you have a firebaseConfig file

const firebaseConfig = {
    apiKey: "AIzaSyCBNPVkLVAZRv3hE_4HFklDyrwR9ctsAyU",
    authDomain: "smartbike-ab002.firebaseapp.com",
    databaseURL: "https://smartbike-ab002-default-rtdb.firebaseio.com",
    projectId: "smartbike-ab002",
    storageBucket: "smartbike-ab002.appspot.com",
    messagingSenderId: "296133854740",
    appId: "1:296133854740:web:c994dcf19f24d865070901",
    measurementId: "G-JS6DT0989H"
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);
// Fetch data example
// Fetch data example using Firebase Database
const dataRef = ref(database, 'some/path');
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  console.log('nono');
  console.log(data);
});



const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

const DistanceProps = {
    // eslint-disable-next-line no-undef
  leg: google.maps.DirectionsLeg,
};

export default function Distance({ leg }) {
    const [sensorData, setSensorData] = useState({ power: 0, energy: 0, prediction: 0 });

    useEffect(() => {
        // Reference to the data path you want to fetch
        const dataRef = ref(database, 'sensors');
        // Listener for data changes at the specified path
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Data received from Firebase:', data);
            setSensorData(data);
        });

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []); 
    const [backendData, setBackendData] = useState([{}]);
    console.log(leg);
    localStorage.setItem('distance', JSON.stringify(leg.duration.text));
    if (!leg.distance || !leg.duration) return null;
  
    const days = Math.floor(
      (commutesPerYear * leg.duration.value) / secondsPerDay
    );
    const cost = Math.floor(
      (leg.distance.value / 1000) * litreCostKM * commutesPerYear
    );
    
    return (
      <div>
        <p>
          This home is <span className="highlight">{leg.distance.text}</span> away
          from your office. That would take{" "}
          <span className="highlight">{leg.duration.text}</span> each direction.
        </p>
  
        <p>
          That's  in your bike each
          year at a cost of{` ${sensorData.energy} KJ from your battery`}
          {/* <span className="highlight">
            ${new Intl.NumberFormat().format(cost)}
          </span> */}
          .
        </p>
      </div>
    );
  }
  