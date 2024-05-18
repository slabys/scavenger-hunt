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
import React, { useState } from "react";
import { getDateWithTime } from "@src/utils/time";

interface HuntListProps {
  id: number;
  name: string;
  dueDate: string;
  description: string;
  path: string;
}

const HuntingList: React.FC = () => {
  const router = useIonRouter();
  const [search, setSearch] = useState<HuntListProps[]>([])

  const fullHuntList: HuntListProps[] = [
    {
      id: 1,
      name: "Hradec Králové Beer Hunting",
      dueDate: "2024-04-25T12:28:00.695Z",
      description: "This hunt will take you around city of Hradec Králové, where you will be able to taste different kinds of beers in multiple pubs. So grab you pitcher and let's get going!",
      path: "/detail/:id",
    },
  ];

  const handleInput = (value: string) => {
    let query = value.toLowerCase();

    setSearch(fullHuntList.filter((d) => d.name.toLowerCase().indexOf(query) > -1));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hunting List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-top">
        <IonTitle>Active Scavenger Hunts</IonTitle>
        <IonSearchbar onIonInput={(ev) => handleInput(ev.target.value ?? "")}></IonSearchbar>

        {(search.length === 0 ? fullHuntList : fullHuntList).map((hunt, index) => {
          return <IonCard key={`hunt-card-${hunt.id}-${index}`} className={"ion-padding-bottom"}>
            <IonCardHeader>
              <IonCardTitle>{hunt.name}</IonCardTitle>
              <IonCardSubtitle>Due date: {getDateWithTime(hunt.dueDate)}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonText>{hunt.description}</IonText>
              <br />
              <IonButton onClick={() => router.push(`/hunt/${hunt.id}`)} className={"ion-float-right"}>
                See more
              </IonButton>
            </IonCardContent>
          </IonCard>;
        })}

      </IonContent>
    </IonPage>
  );
};

export default HuntingList;
