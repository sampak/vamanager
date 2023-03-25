import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import Map from 'components/Map';
import livemapService from 'api/livemapService';
import { createLeafletIcon } from 'utils/createLeafletIcon';
import {
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import MarkerOnMap from 'components/MarkerOnMap';
import { LiveMap as LiveMapDTO } from '@shared/base/LiveMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlightProgress from 'components/FlightProgress';
import FlightInformation from 'components/FlightInformation';
import RoutePath from 'components/RoutePath';

const LiveMap = () => {
  const mapRef = useRef(null);
  const [showFlightInformation, setShowFlightInformation] =
    useState<null | LiveMapDTO>(null);

  const { data: liveMapData, refetch: refetchTraffic } =
    livemapService.useGetLiveMap();

  const { data: trafficData, refetch } = livemapService.useGetTraffic(
    showFlightInformation?.trackerId ?? ''
  );

  const aircrafts: LiveMapDTO[] = useMemo(
    () => liveMapData?.data ?? [],
    [liveMapData]
  );

  const departureIcon = useMemo(
    () => createLeafletIcon(faPlaneDeparture, styles.icon),
    []
  );

  const arrivalIcon = useMemo(
    () => createLeafletIcon(faPlaneArrival, styles.icon),
    []
  );
  const routeIcon = useMemo(() => createLeafletIcon(faSquare, styles.icon), []);

  const traffic = useMemo(() => trafficData?.data ?? null, [trafficData]);

  useEffect(() => {
    const timer = setInterval(() => {
      refetchTraffic();
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!!showFlightInformation?.trackerId.length) {
      refetch();
    }
  }, [showFlightInformation]);

  const route = (traffic?.route ?? [])
    ?.filter((route) => !route.is_sid_star)
    .sort((a, b) => a.index - b.index);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>LIVE FLIGHTS {aircrafts.length}</div>
      <div className={styles.arrowDown}></div>
      <div className={styles.mapWrapper}>
        {showFlightInformation && (
          <FlightInformation
            toggle={setShowFlightInformation}
            informations={traffic}
            LiveMap={showFlightInformation}
          />
        )}
        <Map mapRef={mapRef}>
          <>
            {traffic && (
              <>
                {/* Departure icon */}
                <MarkerOnMap
                  value={traffic.origin!.id}
                  onClick={() => {}}
                  tooltip={`${traffic.origin!.name}`}
                  key={traffic.origin!.id}
                  icon={departureIcon}
                  position={[traffic.origin!.lat, traffic.origin!.lng]}
                />

                {route.map((route) => {
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
                    !!traffic?.tracker?.length
                      ? styles.disabledLineColor
                      : styles.lineColor
                  }
                  origin={traffic.origin}
                  destination={traffic.destination}
                  route={route ?? []}
                />

                <RoutePath
                  color={styles.activeLineColor}
                  tracker={traffic?.tracker ?? []}
                />

                {/* Arrival icon */}
                <MarkerOnMap
                  value={traffic.destination!.id}
                  onClick={() => {}}
                  tooltip={`${traffic.destination!.name}`}
                  key={traffic.destination!.id}
                  icon={arrivalIcon}
                  position={[
                    traffic.destination!.lat,
                    traffic.destination!.lng,
                  ]}
                />
              </>
            )}
            {aircrafts.map((aircraft) => {
              return (
                <MarkerOnMap
                  value={aircraft.trackerId}
                  onClick={() => setShowFlightInformation(aircraft)}
                  // tooltip={`${route.ident}`}
                  key={aircraft.trackerId}
                  icon={createLeafletIcon(
                    faPlane,
                    styles.icon,
                    -80 + aircraft.heading
                  )}
                  position={[Number(aircraft.lat), Number(aircraft.lng)]}
                />
              );
            })}
          </>
        </Map>
      </div>
    </div>
  );
};

export default LiveMap;
