import { Marker, Tooltip, useMap } from 'react-leaflet';
import { FC, Props } from './typings';

const MarkerOnMap: FC<Props> = ({
  value,
  icon,
  tooltip = '',
  tooltipDirection = 'top',
  position,
  onClick,
}) => {
  const map = useMap();
  return (
    <Marker
      eventHandlers={{
        click: () => {
          onClick?.(value);
        },
      }}
      position={position}
      icon={icon}
    >
      {!!tooltip.length && (
        <Tooltip direction={tooltipDirection}>{tooltip}</Tooltip>
      )}
    </Marker>
  );
};

export default MarkerOnMap;
