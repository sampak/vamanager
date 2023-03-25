import { LiveMap } from '@shared/base/LiveMap';
import { LiveMapResponse } from '@shared/responses/LiveMapResponse';

export type { FC } from 'react';

export interface Props {
  LiveMap: LiveMap;
  informations: LiveMapResponse | null;
  toggle: (state: LiveMap | null) => void;
}
