import Airline from "./Airline";

export default interface Airport {
  id: string;
  icao: string;
  iata: string;
  elevation_ft: number;
  name: string;
  keywords: string;
  country: string;
  lat: number;
  lng: number;
  size?: string;
  passangers: number;
}
