import TypeOfAircraft from "./TypeOfAircraft";

export default interface AircraftDealer {
  id: string;
  typeId: string;
  type: TypeOfAircraft;
  image: string;
  cost: number;
}
