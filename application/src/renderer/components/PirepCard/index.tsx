import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Button from '../Button';
import moment from 'moment';
import Map from '../Map';

import {
  faCaretDown,
  faCaretUp,
  faPlaneArrival,
  faPlaneDeparture,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import { createLeafletIcon } from 'renderer/utils/createLeafletIcon';
import MarkerOnMap from '../MarkerOnMap';
import RoutePath from '../RoutePath';
import { getCenterBetweenTwoPoints } from '../../utils/getCenterBetweenTwoPoints';
import { useEffect, useRef, useState } from 'react';
import { calculateZoom } from 'renderer/utils/calculateZoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

const PirepCard: FC<Props> = ({
  pirep,
  onClick,
  isLoading = false,
  isDisabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef(null);
  const [isMapShowed, setIsMapShowed] = useState(false);

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
  }, [ref, isMapShowed]);

  const departureIcon = createLeafletIcon(faPlaneDeparture, styles.icon);
  const arrivalIcon = createLeafletIcon(faPlaneArrival, styles.icon);
  const routeIcon = createLeafletIcon(faSquare, styles.icon);

  const route = pirep
    .route!.filter((route) => !route.is_sid_star)
    .sort((a, b) => a.index - b.index);

  const isMapShowedStyle = isMapShowed ? styles.mapShowed : '';

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.flightNumber}>
          <div className={styles.topText}>{pirep.flightNumber}</div>
          <div className={styles.downText}>Flight Number</div>
        </div>
        <div className={styles.flight}>
          <div className={styles.topText}>
            {pirep.origin?.icao} - {pirep.destination?.icao}
          </div>
          <div className={styles.downText}>Origin - Destination</div>
        </div>
        <div className={styles.distance}>
          <div className={styles.topText}>{pirep.estminatedAirDistance}nm</div>
          <div className={styles.downText}>Distance</div>
        </div>
        <div className={styles.time}>
          <div className={styles.topText}>
            {moment.utc(pirep.estimatedFlightTime * 1000).format('HH:mm')}
          </div>
          <div className={styles.downText}>Flight Time</div>
        </div>
        <div className={styles.button}>
          <Button
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={() => onClick(pirep)}
          >
            FLY
          </Button>
        </div>
      </div>
      <div
        ref={ref}
        className={classNames(styles.mapWrapper, isMapShowedStyle)}
      >
        {isMapShowed && (
          <Map
            className={styles.map}
            zoom={zoom}
            mapRef={mapRef}
            center={centerPoint}
          >
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
                route={route}
                origin={pirep.origin}
                destination={pirep.destination}
                color={styles.pathColor}
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
        )}
      </div>
      <div
        onClick={() => setIsMapShowed(!isMapShowed)}
        className={styles.footer}
      >
        {isMapShowed ? (
          <>
            Hide Map <FontAwesomeIcon icon={faCaretUp} />
          </>
        ) : (
          <>
            Show Map <FontAwesomeIcon icon={faCaretDown} />
          </>
        )}
      </div>
    </div>
  );
};

export default PirepCard;
