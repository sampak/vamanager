import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const createLeafletIcon = (
  icon: IconDefinition,
  className?: string,
  rotate: number = 0
) => {
  const htmlICON = ReactDOMServer.renderToString(
    <FontAwesomeIcon
      style={{ transform: `rotate(${rotate}deg)` }}
      icon={icon}
    />
  );

  return new L.DivIcon({
    html: htmlICON,
    iconAnchor: [5, 8],
    className: className,
  });
};
