import { Circle, LayerGroup, Marker, Popup, useMap } from "react-leaflet";
import { icon, marker, Marker as MarkerProps } from "leaflet";
import React, { useEffect, useMemo, useState } from "react";
import { IonButton, IonText, useIonViewWillEnter } from "@ionic/react";
import { HuntDataProps } from "@components/hunts/HuntDetail";

const locIcon = icon({
  iconUrl: "mapIcons/location.svg",
  iconSize: [32, 32], // size of the icon
});

const startIcon = icon({
  iconUrl: "mapIcons/start.png",
  iconSize: [32, 32], // size of the icon
  iconAnchor: [15, 30],
});

const finishIcon = icon({
  iconUrl: "mapIcons/finish.png",
  iconSize: [32, 32], // size of the icon
  iconAnchor: [15, 30],
});

interface MapControllerProps {
  huntData: HuntDataProps;
  onUpdate: (updatedData: Partial<{ isStarted: boolean; currentRoute: number; }>) => void;
}

const MapController: React.FC<MapControllerProps> = ({ huntData, onUpdate }) => {
  const map = useMap();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<number>(0);
  const [currLocation, setCurrLocation] = useState<GeolocationPosition>();
  let currLocationMarker: MarkerProps | undefined = undefined;

  console.log(isStarted);
  console.log(currLocation);

  useIonViewWillEnter(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((value) => setCurrLocation(value));
    }
  }, []);


  useEffect(() => {
    if (!currLocation) return;
    if (currLocationMarker) map.removeLayer(currLocationMarker);

    currLocationMarker = marker([currLocation.coords.latitude, currLocation.coords.longitude], { icon: locIcon })
      .bindPopup(`You are within ${currLocation.coords.accuracy.toFixed(0)}m`)
      .addTo(map);
    console.log(currLocation);
  }, [currLocation]);

  useEffect(() => {
    onUpdate({ currentRoute: currentRoute });
  }, [currentRoute]);

  const calcDistance = useMemo(() => {
    console.log({
      lat: huntData.start.latlng.lat,
      lng: huntData.start.latlng.lng,
    }, {
      lat: currLocation?.coords.latitude ?? huntData.start.latlng.lat,
      lng: currLocation?.coords.longitude ?? huntData.start.latlng.lng,
    });
    return map.distance({
      lat: huntData.start.latlng.lat,
      lng: huntData.start.latlng.lng,
    }, {
      lat: currLocation?.coords.latitude ?? huntData.start.latlng.lat,
      lng: currLocation?.coords.longitude ?? huntData.start.latlng.lng,
    });
  }, [currLocation]);

  return <LayerGroup>
    <Circle
      center={huntData.start.latlng}
      radius={huntData.start.radius}
      color="green"
      fillColor="green"
    >
      <Popup>
        <IonButton onClick={() => {
          if (calcDistance > 3000) {
            console.log("yes" + calcDistance);
          } else {
            console.log("no" + calcDistance);
          }
        }}>Distance</IonButton>
      </Popup>
    </Circle>
    <Marker position={huntData.start.latlng} icon={startIcon}>
      <Popup>
        {calcDistance < 3000 ? <IonButton onClick={() => {
          onUpdate({ isStarted: true });
          setIsStarted(true);
          setCurrentRoute(0);
        }}>START</IonButton> : <IonText>You need to walk {calcDistance}</IonText>}
      </Popup>
    </Marker>

    <Circle
      center={huntData.finish.latlng}
      radius={huntData.finish.radius}
      color="red"
      fillColor="red"
    >
      <Popup>Finish</Popup>
    </Circle>
    <Marker position={huntData.finish.latlng} icon={finishIcon}>
      <Popup>Finish</Popup>
    </Marker>
  </LayerGroup>;
};

export default MapController;