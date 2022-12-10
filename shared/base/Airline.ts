import Airport from "./Airport";
import { JoiningMethod } from "./JoiningMethod";
import { Membership } from "./Membership";
import { User } from "./User";

export default interface Airline {
  id: string;
  image?: string;
  name: string;
  icao: string;
  baseId: string;
  base?: Airport;
  ownerId: string;
  owner?: User;
  memberships?: Membership[];
  joiningType?: JoiningMethod;
  options?: JSON;
}
