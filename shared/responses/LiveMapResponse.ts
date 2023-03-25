import Airline from "../base/Airline";
import Airport from "../base/Airport";
import { PirepRoute } from "../base/PirepRoute";
import { Tracker } from "../base/Tracker";
import { User } from "../base/User";

export interface LiveMapResponse {
  origin: Airport;
  destination: Airport;
  pilot: User;
  airline: Airline;
  route: PirepRoute[];
  estimatedDistance: number;
  rating: number;
  tracker: Tracker[];
}
