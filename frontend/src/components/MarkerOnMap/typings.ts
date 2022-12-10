import { DivIcon, Icon, IconOptions, LatLngExpression } from 'leaflet';

export type { FC } from 'react';

export interface Props {
  value: string;
  icon: any;
  position: LatLngExpression;
  tooltip?: string;
  tooltipDirection?: 'top' | 'right' | 'left' | 'bottom';
  onClick?: (value: string) => void;
}
