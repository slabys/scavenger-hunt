import MapController from "@components/map/MapController";
import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonCard,
	IonCol,
	IonContent,
	IonFab,
	IonGrid,
	IonHeader,
	IonImg,
	IonItem,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
	useIonRouter,
	useIonViewWillEnter,
} from "@ionic/react";
import { saveHuntData } from "@src/utils/saveHuntData";
import { getDateWithTime } from "@src/utils/time";
import { HuntDataProps } from "@src/utils/types";
import { UserPhoto, usePhotoGallery } from "@src/utils/usePhotoGallery";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const HuntDetail: React.FC = () => {
	const router = useIonRouter();
	const huntId = parseInt(router.routeInfo.pathname.split("/hunt/")[1], 10);
	const [huntData, setHuntData] = useState<HuntDataProps | null>(null);
	const { photos } = usePhotoGallery();

	// Trigger resize, to invalidate map and re-render it
	useIonViewWillEnter(() => {
		window.dispatchEvent(new Event("resize"));
	});

	const handleUpdate = (updatedData: Partial<HuntDataProps>) => {
		if (huntData) {
			const updatedHuntData = { ...huntData, ...updatedData };
			saveHuntData(huntId, updatedHuntData).then(() => setHuntData(updatedHuntData));
		}
	};

	useEffect(() => {
		fetch("/huntData.json")
			.then((response) => response.json())
			.then((data) => setHuntData((data as HuntDataProps[]).find((f) => f.id === huntId) ?? null));
	}, []);

	if (!huntData) return <IonText>Loading...</IonText>;

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot={"start"}>
						<IonBackButton defaultHref={"/"} />
						<IonTitle>Hunt detail</IonTitle>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding-top">
				{!!huntData.finishTime ? (
					<IonTitle color={"success"}>You already finished this hunt!</IonTitle>
				) : (
					<MapContainer center={huntData.start.latlng} zoom={12} style={{ width: "100%", height: "500px" }}>
						<TileLayer
							attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<MapController huntData={huntData} onUpdate={handleUpdate} />
					</MapContainer>
				)}
				<IonCard className={"ion-padding"}>
					{huntData.startTime && (
						<IonItem>
							<IonText>
								<b>Start:</b> {getDateWithTime(huntData.startTime)}
							</IonText>
						</IonItem>
					)}
					{!!huntData.startTime && (
						<IonItem>
							<IonText>
								<b>Routes:</b>
							</IonText>
							<IonCol>
								{huntData.route.map((route, i) => {
									if (typeof route?.answer === "string") {
										return (
											route?.answer && (
												<IonRow key={`fragment-${i}`}>
													<IonText>{`${i}: ${route?.answer.toString()}`}</IonText>
												</IonRow>
											)
										);
									} else {
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
					{huntData.finishTime && (
						<IonItem>
							<IonText>
								<b>Finish:</b> {getDateWithTime(huntData.finishTime)}
							</IonText>
							<br />
							<IonButton
								onClick={() =>
									handleUpdate({
										finishTime: null,
										startTime: null,
										isStarted: false,
										currentRoute: 0,
									})
								}
							>
								Restart Hunt!!!
							</IonButton>
						</IonItem>
					)}
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default HuntDetail;
