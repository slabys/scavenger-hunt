import { locIcon } from "@components/map/icons";
import TaskModal, { TaskModalProps, TaskModalReturnProps } from "@components/modals/TaskModal";
import { calcDistanceInM } from "@src/utils/calcDistanceInM";
import { HuntDataProps } from "@src/utils/types";
import { useTypedIonModal } from "@src/utils/useTypedIonModal";
import { LocationEvent, Map } from "leaflet";
import React from "react";
import { Circle, FeatureGroup, Marker, Popup } from "react-leaflet";

export interface CurrentRouteProps {
	huntData: HuntDataProps;
	currentLocation: LocationEvent | undefined;
	map: Map;
	handleTaskSubmit: (value: TaskModalReturnProps) => void;
}

const CurrentRoute: React.FC<CurrentRouteProps> = ({ huntData, currentLocation, map, handleTaskSubmit }) => {
	const { currentRoute, route } = huntData;
	const nextPoint = route[currentRoute];

	const [taskModal, closeTaskModal] = useTypedIonModal<TaskModalProps>(
		TaskModal,
		// Modal component props
		{
			huntData: huntData,
			dismiss: (data, role) => {
				console.log({ data, role });
				if (role === "close") {
					closeTaskModal();
				} else if (role === "submit") {
					if (!data) return;
					handleTaskSubmit(data);
					closeTaskModal();
				}
			},
		},
	);

	return (
		<>
			<FeatureGroup
				eventHandlers={{
					click: () => {
						if (!currentLocation?.latlng) return;
						const distance = calcDistanceInM(map, currentLocation.latlng, nextPoint.latlng);
						if (distance > nextPoint.radius) taskModal();
					},
				}}
			>
				<Circle center={nextPoint.latlng} radius={nextPoint.radius} color="purple" fillColor="purple" />
				<Marker position={nextPoint.latlng} icon={locIcon} />
				{currentLocation?.latlng && (
					<Popup>
						You are {calcDistanceInM(map, currentLocation.latlng, nextPoint.latlng).toFixed(2)}m far away
					</Popup>
				)}
			</FeatureGroup>
		</>
	);
};

export default CurrentRoute;
