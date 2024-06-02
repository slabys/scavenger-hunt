import React, { ReactNode, useMemo, useRef, useState } from "react";
import {
  IonButton, IonCard,
  IonContent,
  IonHeader, IonIcon, IonInput,
  IonPage, IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { close } from "ionicons/icons";
import { GeneralModalType } from "@src/utils/useTypedIonModal";
import StartModalContent from "@components/map/StartModalContent";
import FinishModalContent from "@components/map/FinishModalContent";
import { HuntDataProps, RouteType } from "@src/utils/types";

export type ModalReturnProps = string | null

export interface TaskModalProps extends GeneralModalType<ModalReturnProps> {
  huntData: HuntDataProps;
}

export interface TaskTextProps {
  onSubmit: ({ value, submit }: { value: string, submit: string }) => void
}

const TaskText: React.FC<TaskTextProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState<string>("");
  return <IonCard>
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit({ value: answer, submit: "submit" })
    }}
    >
      <IonInput
        labelPlacement={"stacked"}
        label={"Answer"}
        fill={"solid"}
        value={answer}
        onIonChange={(e) => {
          setAnswer(String(e.target.value));
        }}
      />
      <IonButton style={{ width: "100%" }} type={"submit"}>Submit</IonButton>
    </form>
  </IonCard>;
};

const TaskController: React.FC<{
  taskPoint: RouteType
  onSubmit: ({ value, submit }: { value: string, submit: string }) => void
}> = ({ taskPoint, onSubmit }) => {

  if (taskPoint.type === "text") {
    return <TaskText onSubmit={onSubmit} />;
  }
};

const TaskModal: React.FC<TaskModalProps> = ({ dismiss, huntData }) => {
  const taskPoint = huntData.route[huntData.currentRoute];

  const onSubmit = ({ value, submit }: {
    value?: string, submit?: string
  }) => {
    if (submit === "submit") dismiss(value, "submit");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{taskPoint.taskTitle}</IonTitle>
          <IonIcon icon={close} size="large" slot="end" onClick={() => dismiss(null, "close")} />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-vertical">
        <IonText className="ion-padding">{taskPoint.taskDescription}</IonText>
        <TaskController
          taskPoint={taskPoint}
          onSubmit={onSubmit}
        />
      </IonContent>
    </IonPage>
  );
};

export default TaskModal;