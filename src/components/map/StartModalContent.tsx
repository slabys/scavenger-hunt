import React from "react";
import {
  IonButton, IonText,
} from "@ionic/react";

export interface StartModalProps {
  handleStart: () => void;
}

const StartModalContent: React.FC<StartModalProps> = ({ handleStart }) => {
  return <>
    <IonText>
      By clicking this button you will start this Scavenger hunt. From that moment we will calculate the time
      spend hunting
    </IonText>
    <IonButton onClick={handleStart}>Start Hunting!</IonButton>
  </>;

};

export default StartModalContent;