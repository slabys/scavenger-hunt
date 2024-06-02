import {
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage, IonSearchbar, IonText,
  IonTitle,
  IonToolbar, useIonRouter,
} from "@ionic/react";
import "@pages/list/Tab1.css";
import React, { useEffect, useState } from "react";
import { getDateWithTime } from "@src/utils/time";
import { HuntDataProps } from "@src/utils/types";


const HuntingList: React.FC = () => {
  const router = useIonRouter();
  const [searchList, setSearchList] = useState<HuntDataProps[]>([])
  const [huntsList, setHuntsList] = useState<HuntDataProps[] | null>(null);

  useEffect(() => {
    fetch("/huntData.json")
      .then(response => response.json())
      .then(data => setHuntsList(data))
  }, []);

  if (!huntsList) return "Loading..."

  const handleInput = (value: string) => {
    let query = value.toLowerCase();
    setSearchList(huntsList.filter((d) => d.name.toLowerCase().indexOf(query) > -1));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hunting List  🏹</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-top">
        <IonTitle>Active Scavenger Hunts</IonTitle>
        <IonSearchbar onIonInput={(ev) => handleInput(ev.target.value ?? "")}></IonSearchbar>

        {(searchList.length !== 0 ? searchList : huntsList).map((hunt, index) => {
          return <IonCard key={`hunt-card-${hunt.id}-${index}`} className={"ion-padding-bottom"}>
            <IonCardHeader>
              <IonCardTitle>{hunt.name}</IonCardTitle>
              <IonCardSubtitle>Due date: {getDateWithTime(hunt.dueDate)}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonText>{hunt.description}</IonText>
              <br />
              <IonButton onClick={() => router.push(`/hunt/${hunt.id}`)} className={"ion-float-right"}>
                Hunt!
              </IonButton>
            </IonCardContent>
          </IonCard>;
        })}

      </IonContent>
    </IonPage>
  );
};

export default HuntingList;
