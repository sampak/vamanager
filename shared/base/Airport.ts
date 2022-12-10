import Airline from "./Airline";

export default interface Airport {
  id: string;
  icao: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  airlines: Airline[];
}
