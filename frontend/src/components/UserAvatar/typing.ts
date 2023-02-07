import { Membership } from '@shared/base/Membership';
import { User } from '@shared/base/User';

export type { FC } from 'react';

export interface Props {
  user: User;
  membership: Membership;
  className?: string;
}
