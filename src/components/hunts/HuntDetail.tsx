import React, { useEffect, useRef, useState } from "react";
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput, IonItem, IonModal, IonPage, IonText,
  IonTitle,
  IonToolbar, useIonRouter, useIonViewWillEnter,
} from "@ionic/react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapController from "@components/map/MapController";
import { LocationEvent } from "leaflet";
import MapComponent from "@components/map/MapComponent";
import { saveHuntData } from "@src/utils/saveHuntData";

export interface HuntDataProps {
  id: number;
  isStarted: boolean;
  currentRoute: number;
  start: {
    latlng: {
      lat: number;
      lng: number;
    };
    radius: number;
  };
  route: {
    latlng: {
      lat: number;
      lng: number;
    };
    radius: number;
  }[];
  finish: {
    latlng: {
      lat: number;
      lng: number;
    };
    radius: number;
  };
}

const HuntDetail: React.FC = () => {
  const router = useIonRouter();
  const huntId = parseInt(router.routeInfo.pathname.split("/hunt/")[1], 10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);

  const [huntData, setHuntData] = useState<HuntDataProps | null>(null);

  // Trigger resize, to invalidate map and re-render it
  useIonViewWillEnter(() => {
    window.dispatchEvent(new Event("resize"));
  });

  useEffect(() => {
    fetch("/huntData.json")
      .then(response => response.json())
      .then(data => setHuntData((data as HuntDataProps[]).find((f) => f.id === huntId) ?? null));
  }, []);

  const handleUpdate = (updatedData: Partial<HuntDataProps>) => {
    if (huntData) {
      const updatedHuntData = { ...huntData, ...updatedData };
      console.log(updatedHuntData)
      setHuntData(updatedHuntData);
      saveHuntData(huntId, updatedHuntData).then((r) => console.log(r));
    }
  };

  if(!huntData) return <IonText>Loading...</IonText>

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
      <MapContainer center={[50.210, 15.835]} zoom={12} style={{ width: "100%", height: "500px" }}>
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController huntData={huntData} onUpdate={handleUpdate} />
        {/*<MapComponent />*/}
      </MapContainer>
    </IonContent>

    <IonModal isOpen={isModalOpen} onWillDismiss={() => modal.current?.dismiss()}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Enter your name"
            labelPlacement="stacked"
            type="text"
            placeholder="Your name"
          />
        </IonItem>
      </IonContent>
    </IonModal>
  </IonPage>;
};

export default HuntDetail;