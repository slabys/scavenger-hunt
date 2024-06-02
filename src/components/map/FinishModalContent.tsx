import { IonButton, IonText } from "@ionic/react";
import React from "react";

export interface FinishModalContentProps {
	handleFinish: () => void;
}

const FinishModalContent: React.FC<FinishModalContentProps> = ({ handleFinish }) => {
	return (
		<>
			<IonText>
				By clicking this button you will end this Scavenger hunt. Final time will be calculated based on start
				and finish time.
			</IonText>
			<IonButton onClick={handleFinish}>Finish Hunting!</IonButton>
		</>
	);
};

export default FinishModalContent;
