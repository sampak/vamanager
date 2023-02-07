import { Membership } from '@shared/base/Membership';

export type { FC } from 'react';

export interface Props {
  membership: Membership;
  className?: string;
}
