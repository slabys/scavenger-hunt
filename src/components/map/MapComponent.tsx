import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | undefined>(undefined);
  const [distance, setDistance] = useState('');

  const markerPosition: [number, number] = [50.505, 15.89]; // Example marker position: London

  const calcDist = useCallback(() => {
    const dist = L.latLng({lat: userLocation![0], lng: userLocation![1] }).distanceTo(markerPosition);
    setDistance(`${(dist / 1000).toFixed(2)} km`);
  }, [userLocation])

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newUserLocation: [number, number] = [latitude, longitude];
        setUserLocation(newUserLocation);
        const dist = L.latLng(newUserLocation).distanceTo(markerPosition);
        setDistance(`${(dist / 1000).toFixed(2)} km`);
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
      }
    );

    // Cleanup geolocation watcher on component unmount
    return () => navigator.geolocation.clearWatch(id);
  }, []); // Empty dependency array to run once on mount

  setTimeout(() => {
    setUserLocation((prev) => prev && [prev[0] + 0.001, prev[1]])
    calcDist()
  },1000)

  return (
    <MapContainer center={markerPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>Your location. Distance to marker: {distance}</Popup>
        </Marker>
      )}
      <Marker position={markerPosition}>
        <Popup>A marker in London.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
