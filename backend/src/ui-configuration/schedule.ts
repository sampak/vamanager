import { Memberships, Schedules } from '@prisma/client';
import { ScheduleUIConfiguration } from '@shared/ui-configuration/schedule';
import { MembershipRole } from '@shared/base/MembershipRole';

const getScheduleConfiguration = (
  prismaSchedule: Schedules,
  membership: Memberships
): ScheduleUIConfiguration => {
  const role = membership?.role as MembershipRole;
  const canDelete =
    role === MembershipRole.ADMIN || role === MembershipRole.DISPATCHER;

  return {
    delete: canDelete,
  };
};

export default getScheduleConfiguration;
