import {
	IonActionSheet,
	IonCard,
	IonCol,
	IonContent,
	IonFab,
	IonFabButton,
	IonGrid,
	IonHeader,
	IonIcon,
	IonImg,
	IonItem,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { getDateWithTime } from "@src/utils/time";
import { HuntDataProps } from "@src/utils/types";
import { UserPhoto, usePhotoGallery } from "@src/utils/usePhotoGallery";
import { camera, close, trash } from "ionicons/icons";
import React, { useEffect, useState } from "react";

const Overview: React.FC = () => {
	const { photos, takePhoto, deletePhoto } = usePhotoGallery();
	const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

	const [huntsList, setHuntsList] = useState<HuntDataProps[] | null>(null);

	useEffect(() => {
		fetch("/huntData.json")
			.then((response) => response.json())
			.then((data) => setHuntsList(data));
	}, []);

	if (!huntsList) return "Loading...";

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Active Hunt Overview</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonTitle color={"success"} className={"ion-padding"}>
					Finished hunts!
				</IonTitle>
				{huntsList
					.filter((f) => f.finishTime)
					.map((hunt, i) => (
						<IonCard key={`finished Hunt-${i}`}>
							{hunt.startTime && (
								<IonItem>
									<IonText>
										<b>Start:</b> {getDateWithTime(hunt.startTime)}
									</IonText>
								</IonItem>
							)}
							{!!hunt.startTime && (
								<IonItem>
									<IonText>
										<b>Routes:</b>
									</IonText>
									<IonCol>
										{hunt.route.map((route, i) => {
											if (typeof route?.answer === "string") {
												return (
													route?.answer && (
														<IonRow key={`fragment-${i}`}>
															<IonText>{`${i}: ${route?.answer.toString()}`}</IonText>
														</IonRow>
													)
												);
											} else if (typeof route?.answer === "object") {
												return (
													route?.answer && (
														<IonRow key={`fragment-${i}`}>
															<IonText>{`${i}:`}</IonText>
															<IonCol size="6">
																<IonImg
																	src={
																		photos.find(
																			(f) =>
																				f.filepath ===
																				(route.answer as UserPhoto).filepath,
																		)?.webviewPath
																	}
																/>
															</IonCol>
														</IonRow>
													)
												);
											}
										})}
									</IonCol>
								</IonItem>
							)}
							{hunt.finishTime && (
								<IonItem>
									<IonText>
										<b>Finish:</b> {getDateWithTime(hunt.finishTime)}
									</IonText>
								</IonItem>
							)}
						</IonCard>
					))}
				<IonTitle className={"ion-padding"}>All pictures:</IonTitle>
				<IonGrid>
					<IonRow>
						{photos.map((photo, index) => (
							<IonCol size="12" key={`picture-col-${index}`}>
								<IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
							</IonCol>
						))}
					</IonRow>
				</IonGrid>
				<IonFab vertical="bottom" horizontal="center" slot="fixed">
					<IonFabButton onClick={() => takePhoto()}>
						<IonIcon icon={camera}></IonIcon>
					</IonFabButton>
				</IonFab>
				<IonActionSheet
					isOpen={!!photoToDelete}
					buttons={[
						{
							text: "Delete",
							role: "destructive",
							icon: trash,
							handler: () => {
								if (photoToDelete) {
									deletePhoto(photoToDelete);
									setPhotoToDelete(undefined);
								}
							},
						},
						{
							text: "Cancel",
							icon: close,
							role: "cancel",
						},
					]}
					onDidDismiss={() => setPhotoToDelete(undefined)}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Overview;
