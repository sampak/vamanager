import Airline from "./Airline";
import TypeOfAircraft from "./TypeOfAircraft";

export default interface Aircraft {
  id: string;
  image: string;
  airlineId: string;
  airline?: Airline;
  typeId: string;
  type: TypeOfAircraft;
  registration: string;
  minutes: number;
  miles: number;
  createdAt: Date;
}
