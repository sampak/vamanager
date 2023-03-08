import { Pirep } from "./Pirep";

export interface PirepRoute {
  id: string;
  ident: string;
  name: string;
  type: string;
  pos_lat: string;
  pos_lng: string;
  airway: string;
  is_sid_star: boolean;
  pirepId: string;
  pirep?: Pirep;
  index: number;
}
