import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { createLeafletIcon } from 'utils/createLeafletIcon';
import {
  faPlaneArrival,
  faPlaneDeparture,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import Map from 'components/Map';
import MarkerOnMap from 'components/MarkerOnMap';
import { useEffect, useRef, useState } from 'react';
import RoutePath from 'components/RoutePath';
import { calculateZoom } from 'utils/calculateZoom';
import { getCenterBetweenTwoPoints } from 'utils/getCenterBetweenTwoPoints';

const PirepMap: FC<Props> = ({ pirep }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef(null);
  const departureIcon = createLeafletIcon(faPlaneDeparture, styles.icon);
  const arrivalIcon = createLeafletIcon(faPlaneArrival, styles.icon);
  const routeIcon = createLeafletIcon(faSquare, styles.icon);

  const route = pirep.route
    ?.filter((route) => !route.is_sid_star)
    .sort((a, b) => a.index - b.index);

  const centerPoint = getCenterBetweenTwoPoints(
    pirep.origin!.lat,
    pirep.origin!.lng,
    pirep.destination!.lat,
    pirep.destination!.lng
  );

  const [zoom, setZoom] = useState(4);

  const getZoom = (width: number) => {
    const newZoom = calculateZoom(
      pirep.origin!.lat,
      pirep.origin!.lng,
      pirep.destination!.lat,
      pirep.destination!.lng,
      width
    );

    setZoom(newZoom);
  };

  useEffect(() => {
    if (ref.current) {
      getZoom(ref.current.clientWidth);
    }
  }, [ref]);

  return (
    <div ref={ref} className={styles.wrapper}>
      <Map zoom={zoom} mapRef={mapRef} center={centerPoint}>
        <>
          {/* Departure icon */}
          <MarkerOnMap
            value={pirep.origin!.id}
            onClick={() => {}}
            tooltip={`${pirep.origin!.name}`}
            key={pirep.origin!.id}
            icon={departureIcon}
            position={[pirep.origin!.lat, pirep.origin!.lng]}
          />

          {/* Route Icon */}
          {pirep
            .route!.filter((route) => !route.is_sid_star)
            .map((route) => {
              return (
                <MarkerOnMap
                  value={route.id}
                  onClick={() => {}}
                  tooltip={`${route.ident}`}
                  key={route.id}
                  icon={routeIcon}
                  position={[Number(route.pos_lat), Number(route.pos_lng)]}
                />
              );
            })}

          <RoutePath
            color={
              !!pirep?.tracker?.length
                ? styles.disabledLineColor
                : styles.lineColor
            }
            origin={pirep.origin}
            destination={pirep.destination}
            route={route ?? []}
          />

          <RoutePath
            color={styles.activeLineColor}
            tracker={pirep?.tracker ?? []}
          />

          {/* Arrival Icon */}
          <MarkerOnMap
            value={pirep.destination!.id}
            onClick={() => {}}
            tooltip={`${pirep.destination!.name}`}
            key={pirep.destination!.id}
            icon={arrivalIcon}
            position={[pirep.destination!.lat, pirep.destination!.lng]}
          />
        </>
      </Map>
    </div>
  );
};

export default PirepMap;
