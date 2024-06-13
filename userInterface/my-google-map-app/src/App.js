
import './App.css';
import Map from './../src/components/myMap'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Intro from './../src/components/intro'
import Login from './../src/components/login'
import Signup from './../src/components/signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAENmqEuKNQrRkxSSrfLidR1L1-4PFfe0I',
    libraries:['places'],
  });
  

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map</div>;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>);
}

export default App;
