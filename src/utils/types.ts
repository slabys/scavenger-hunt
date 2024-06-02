import { UserPhoto } from "@src/utils/usePhotoGallery";

export interface RouteType {
	taskTitle: string;
	taskDescription: string;
	type: "text" | "picture";
	latlng: {
		lat: number;
		lng: number;
	};
	answer?: string | UserPhoto;
	radius: number;
}

export interface HuntDataProps {
	id: number;
	name: string;
	dueDate: string;
	description: string;
	start: {
		latlng: {
			lat: number;
			lng: number;
		};
		radius: number;
	};
	finish: {
		latlng: {
			lat: number;
			lng: number;
		};
		radius: number;
	};
	route: RouteType[];
	isStarted: boolean;
	startTime: string | null;
	finishTime: string | null;
	currentRoute: number;
}
