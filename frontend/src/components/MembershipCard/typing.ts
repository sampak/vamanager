import { Membership } from '@shared/base/Membership';

export type { FC } from 'react';

export interface Props {
  setError: (value: string) => void;
  membership: Membership;
  refetchUsers: () => void;
}
