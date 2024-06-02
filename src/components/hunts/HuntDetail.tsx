import React, { useEffect, useRef, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar, useIonRouter, useIonViewWillEnter,
} from "@ionic/react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapController from "@components/map/MapController";
import { saveHuntData } from "@src/utils/saveHuntData";
import { HuntDataProps } from "@src/utils/types";

const HuntDetail: React.FC = () => {
  const router = useIonRouter();
  const huntId = parseInt(router.routeInfo.pathname.split("/hunt/")[1], 10);
  const [huntData, setHuntData] = useState<HuntDataProps | null>(null);

  // Trigger resize, to invalidate map and re-render it
  useIonViewWillEnter(() => {
    window.dispatchEvent(new Event("resize"));
  });

  const handleUpdate = (updatedData: Partial<HuntDataProps>) => {
    if (huntData) {
      const updatedHuntData = { ...huntData, ...updatedData };
      saveHuntData(huntId, updatedHuntData).then(() => setHuntData(updatedHuntData));
    }
  };

  useEffect(() => {
    fetch("/huntData.json")
      .then(response => response.json())
      .then(data => setHuntData((data as HuntDataProps[]).find((f) => f.id === huntId) ?? null));
  }, []);


  if (!huntData) return <IonText>Loading...</IonText>;

  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot={"start"}>
          <IonBackButton defaultHref={"/"} />
          <IonTitle>Hunt detail</IonTitle>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding-top">
      <MapContainer center={huntData.start.latlng} zoom={12} style={{ width: "100%", height: "500px" }}>
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController huntData={huntData} onUpdate={handleUpdate} />
      </MapContainer>
      {huntData.route.map((route, i) => {
        return route?.answer &&
          <React.Fragment key={`fragment-${i}`}><IonText>{`${i}: ${route?.answer}`}</IonText><br /></React.Fragment>;
      })}
    </IonContent>
  </IonPage>;
};

export default HuntDetail;