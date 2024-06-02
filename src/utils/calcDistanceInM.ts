import { Map, LatLngExpression } from "leaflet";

export const calcDistanceInM = (map: Map, currLocation:  LatLngExpression, pointLocation:  LatLngExpression): number => {
  return map.distance(currLocation, pointLocation);
};