import { Circle, FeatureGroup, Marker, Popup, useMap } from "react-leaflet";
import { LocationEvent } from "leaflet";
import React, { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { HuntDataProps } from "@src/utils/types";
import { finishIcon, startIcon } from "@components/map/icons";
import Modal, { ModalProps } from "@components/modals/Modal";
import { useTypedIonModal } from "@src/utils/useTypedIonModal";
import { calcDistanceInM } from "@src/utils/calcDistanceInM";
import CurrentRoute from "@components/map/CurrentRoute";
import { TaskModalReturnProps } from "@components/modals/TaskModal";

interface MapControllerProps {
  huntData: HuntDataProps;
  onUpdate: (updatedData: Partial<HuntDataProps>) => void;
}

const MapController: React.FC<MapControllerProps> = ({ huntData, onUpdate }) => {
  const map = useMap();
  const [currLocation, setCurrLocation] = useState<LocationEvent>();

  const handleTaskSubmit = (value: TaskModalReturnProps) => {
    if (!value) return;
    let newHuntData = huntData;
    newHuntData.route[huntData.currentRoute].answer = value;
    newHuntData.currentRoute = newHuntData.currentRoute + 1;

    onUpdate({ ...newHuntData });
  };

  const onLocationFound = (locationEvent: LocationEvent) => {
    if (!locationEvent) return;
    setCurrLocation(locationEvent);
  };

  useIonViewWillEnter(() => {
    map.on("locationfound", onLocationFound);
    map.on("locationerror", () => {
    });

    map.locate({ watch: true, enableHighAccuracy: true });
  }, []);

  const [modal, closeModal] = useTypedIonModal<ModalProps>(Modal,
    // Modal component props
    {
      title: huntData.name,
      startModal: huntData.startTime === null ? {
        handleStart: () => {
          onUpdate({ startTime: new Date().toString(), currentRoute: 0 });
          closeModal();
        },
      } : undefined,
      finishModal: !!huntData.startTime ? {
        handleFinish: () => {
          onUpdate({ finishTime: new Date().toString() });
          closeModal();
        },
      } : undefined,
      dismiss: (data, role) => {
        if (role === "close") {
          closeModal();
        }
      },
    },
  );

  return <>
    {/* START feature group */}
    {currLocation?.latlng && <FeatureGroup>
      <Circle
        center={currLocation.latlng}
        radius={currLocation.accuracy}
      />
      <Marker position={currLocation.latlng} />
      <Popup>{`You are within ${currLocation.accuracy.toFixed(0)}m`}</Popup>
    </FeatureGroup>
    }
    {!huntData.startTime && <FeatureGroup eventHandlers={{
      click: () => {
        if (!currLocation?.latlng) return;
        const distance = calcDistanceInM(map, currLocation.latlng, huntData.start.latlng);
        if (distance < huntData.route[huntData.currentRoute].radius) modal();
      },
    }}>
      <Circle
        center={huntData.start.latlng}
        radius={huntData.start.radius}
        color="green"
        fillColor="green"
      />
      <Marker position={huntData.start.latlng} icon={startIcon} />
      {currLocation?.latlng &&
        <Popup>You are {calcDistanceInM(map, currLocation.latlng, huntData.start.latlng).toFixed(2)}m far away</Popup>}
    </FeatureGroup>}
    {/* Current Route display */}

    {!!huntData.startTime && huntData.currentRoute < huntData.route.length &&
      <CurrentRoute huntData={huntData} currentLocation={currLocation} map={map} handleTaskSubmit={handleTaskSubmit} />
    }

    {/* END feature group */}
    {huntData.currentRoute === huntData.route.length && <FeatureGroup
      eventHandlers={{
        click: () => {
          if (!currLocation?.latlng) return;
          const distance = calcDistanceInM(map, currLocation.latlng, huntData.start.latlng);
          if (distance < huntData.route[huntData.currentRoute].radius) modal();
        },
      }}
    >
      <Circle
        center={huntData.finish.latlng}
        radius={huntData.finish.radius}
        color="red"
        fillColor="red"
      />
      <Marker position={huntData.finish.latlng} icon={finishIcon} />
      {currLocation?.latlng &&
        <Popup>You are {calcDistanceInM(map, currLocation.latlng, huntData.start.latlng).toFixed(2)}m far away</Popup>}
    </FeatureGroup>}
  </>;
};

export default MapController;