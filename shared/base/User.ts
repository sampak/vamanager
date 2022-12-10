import { Membership } from "./Membership";
import { UserStatus } from "./UserStatus";

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: UserStatus;
  allowShowLastName: boolean;
  showOnbording?: boolean;
  memberships?: Membership[];
}
