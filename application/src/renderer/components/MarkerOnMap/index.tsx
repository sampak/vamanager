import { Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, Props } from './typings';

const MarkerOnMap: FC<Props> = ({
  value,
  icon,
  tooltip = '',
  tooltipDirection = 'top',
  position,
  onClick,
}) => {
  return (
    <Marker
      eventHandlers={{
        click: () => {
          onClick?.(value);
        },
      }}
      icon={icon}
      position={position}
    >
      {!!tooltip.length && (
        <Tooltip direction={tooltipDirection}>{tooltip}</Tooltip>
      )}
    </Marker>
  );
};

export default MarkerOnMap;
