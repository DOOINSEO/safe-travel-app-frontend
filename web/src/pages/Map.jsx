import React from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100vh',
};

// 캄보디아 프놈펜
const center = {
  lat: 11.5564,
  lng: 104.9282,
};

export default function MAP() {
  return (
    <div className="w-full h-screen">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} options={{}}></GoogleMap>
      </LoadScript>
    </div>
  );
}
