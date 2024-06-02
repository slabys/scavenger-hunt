import FinishModalContent from "@components/map/FinishModalContent";
import StartModalContent from "@components/map/StartModalContent";
import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { GeneralModalType } from "@src/utils/useTypedIonModal";
import { close } from "ionicons/icons";
import React, { ReactNode } from "react";

export type ModalReturnProps = null;

export interface ModalProps extends GeneralModalType<ModalReturnProps> {
	title?: string;
	content?: ReactNode;
	// Start Modal
	startModal?: {
		handleStart: () => void;
	};
	// End Modal
	finishModal?: {
		handleFinish: () => void;
	};
}

const Modal: React.FC<ModalProps> = ({ dismiss, title, content, startModal, finishModal }) => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{title}</IonTitle>
					<IonIcon icon={close} size="large" slot="end" onClick={() => dismiss(null, "close")} />
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				{content}
				{startModal && <StartModalContent handleStart={startModal.handleStart} />}
				{finishModal && <FinishModalContent handleFinish={finishModal.handleFinish} />}
			</IonContent>
		</IonPage>
	);
};

export default Modal;
