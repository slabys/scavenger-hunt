import {
	IonButton,
	IonCard,
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonInput,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { HuntDataProps, RouteType } from "@src/utils/types";
import { UserPhoto, usePhotoGallery } from "@src/utils/usePhotoGallery";
import { GeneralModalType } from "@src/utils/useTypedIonModal";
import { camera, close } from "ionicons/icons";
import React, { useState } from "react";

export type TaskModalReturnProps = UserPhoto | string | null;

export interface TaskModalProps extends GeneralModalType<TaskModalReturnProps> {
	huntData: HuntDataProps;
}

export interface TaskTextProps {
	onSubmit: ({ value, submit }: { value: string; submit: string }) => void;
}

const TaskText: React.FC<TaskTextProps> = ({ onSubmit }) => {
	const [answer, setAnswer] = useState<string>("");
	return (
		<IonCard>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit({ value: answer, submit: "submit" });
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
				<IonButton style={{ width: "100%" }} type={"submit"}>
					Submit
				</IonButton>
			</form>
		</IonCard>
	);
};

const TaskController: React.FC<{
	taskPoint: RouteType;
	onSubmit: ({ value, submit }: { value: TaskModalReturnProps; submit: string }) => void;
}> = ({ taskPoint, onSubmit }) => {
	const { photos, takePhoto } = usePhotoGallery();
	console.log(photos[-1]);

	if (taskPoint.type === "text") {
		return <TaskText onSubmit={onSubmit} />;
	}
	if (taskPoint.type === "picture") {
		return (
			<IonFab vertical="bottom" horizontal="center" slot="fixed">
				<IonFabButton
					onClick={async () => {
						const photo = await takePhoto();
						onSubmit({ value: photo, submit: "submit" });
					}}
				>
					<IonIcon icon={camera}></IonIcon>
				</IonFabButton>
			</IonFab>
		);
	}
};

const TaskModal: React.FC<TaskModalProps> = ({ dismiss, huntData }) => {
	const taskPoint = huntData.route[huntData.currentRoute];

	const onSubmit = ({ value, submit }: { value?: TaskModalReturnProps; submit?: string }) => {
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
				<TaskController taskPoint={taskPoint} onSubmit={onSubmit} />
			</IonContent>
		</IonPage>
	);
};

export default TaskModal;
