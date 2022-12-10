import Airline from "./Airline";
import { MembershipStatus } from "./MembershipStatus";
import { User } from "./User";

export interface Membership {
  id: string;
  airlineId: string;
  airline?: Airline;
  userId: string;
  user?: User;
  status: MembershipStatus;
}
