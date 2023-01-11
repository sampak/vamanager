import Airline from "./Airline";

export default interface Aircraft {
  id: string;
  image: string;
  airlineId: string;
  airline?: Airline;
  manufacture: string;
  type: string;
  registration: string;
  minutes: number;
  miles: number;
  createdAt: Date;
}
