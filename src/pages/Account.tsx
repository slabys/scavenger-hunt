import {
	IonAvatar,
	IonCard,
	IonCol,
	IonContent,
	IonHeader,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { HuntDataProps } from "@src/utils/types";
import React, { useEffect, useState } from "react";

const Account: React.FC = () => {
	const [huntsList, setHuntsList] = useState<HuntDataProps[] | null>(null);

	useEffect(() => {
		fetch("/huntData.json")
			.then((response) => response.json())
			.then((data) => setHuntsList(data));
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Your Account</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className={"ion-padding"}>
				<IonCard className={"ion-padding ion-no-margin"}>
					<IonRow>
						<IonAvatar>
							<img alt="Silhouette of a person's head" src="/avatar.svg" />
						</IonAvatar>
						<IonCol className={"ion-margin-start"}>
							<IonText color={"dark"}>
								<h1 className={"ion-no-margin"}>Joe Doe</h1>
							</IonText>
							<IonText>johdoe</IonText>
						</IonCol>
					</IonRow>
				</IonCard>
				<div className={"ion-padding-top"}>
					{!huntsList ? (
						<IonText>Loading...</IonText>
					) : (
						<IonCol>
							<IonText>
								Hunt's completed:{" "}
								{huntsList.reduce((accumulator, currentValue) => {
									if (currentValue.finishTime !== null) {
										return accumulator + 1;
									}
									return accumulator;
								}, 0)}
							</IonText>
						</IonCol>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Account;
