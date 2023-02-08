import {
  Aircrafts,
  Memberships,
  membership_role,
  membership_status,
  Users,
} from '@prisma/client';
import { AircraftUIConfiguration } from '@shared/ui-configuration/aircraft';
import { AuthedUser } from 'src/dto/AuthedUser';

const getAircraftConfiguration = (
  aircraft: Aircrafts,
  currentUser?: AuthedUser
): AircraftUIConfiguration => {
  const isAdmin =
    currentUser?.memberships?.[0].role === membership_role.ADMIN ?? false;

  return {
    canChangeImage: isAdmin,
    canSellAircraft: isAdmin,
  };
};

export default getAircraftConfiguration;
