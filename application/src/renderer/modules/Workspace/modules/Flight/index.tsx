import {
  faCaretDown,
  faCaretUp,
  faLock,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Title from '../../../../components/Title';
import Map from '../../../../components/Map';
import styles from './styles.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import FlightProgress from '../../../../components/FlightProgress';
import { Rating, Tooltip } from '@mui/material';
import RoundedButton from 'renderer/components/RoundedButton';
import Logs from '../../../../components/Logs';
import { EventsType } from '../../../../../dto/Events';
import { Acars } from '../../../../../main/simConnect/typings';
import { Pirep } from '@shared/base/Pirep';
import AcarsContext from 'renderer/contexts/acars';
import { createLeafletIcon } from 'renderer/utils/createLeafletIcon';
import MarkerOnMap from 'renderer/components/MarkerOnMap';
import RoutePath from 'renderer/components/RoutePath';
import { metersToNauticalMiles } from 'renderer/utils/metersToNauticalMiles';
import { getDistance } from 'geolib';
import moment from 'moment';
import { SubmitPirepResponse } from '../../../../../dto/response/SubmitPirepResponse';
import { Tracker } from '../../../../../dto/Tracker';
import { navigateInsideWorkspace } from 'renderer/utils/navigateInsideWorkspace';
import { useNavigate, useParams } from 'react-router-dom';

const Flight = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const { acars, setAcars } = useContext(AcarsContext);

  const planeIcon = createLeafletIcon(
    faPlane,
    styles.icon,
    -80 + (acars?.acars?.heading ?? 0)
  );
  const departureIcon = createLeafletIcon(faPlaneDeparture, styles.icon);
  const arrivalIcon = createLeafletIcon(faPlaneArrival, styles.icon);
  const routeIcon = createLeafletIcon(faSquare, styles.icon);

  const [mapShowed, setMapShowed] = useState(true);
  const [logsShowed, setLogsShowed] = useState(false);

  let progress = 0;
  let distanceBetweenAirports = metersToNauticalMiles(
    getDistance(
      {
        lat: acars?.pirep?.origin?.lat ?? 0,
        lng: acars?.pirep?.origin?.lng ?? 0,
      },
      {
        lat: acars?.pirep?.destination?.lat ?? 0,
        lng: acars?.pirep?.destination?.lng ?? 0,
      }
    ) ?? 0
  );

  let actualDistance = Math.floor(metersToNauticalMiles(acars?.distance ?? 0));

  if (acars?.distance && acars.pirep.estminatedAirDistance) {
    progress = 100 - (actualDistance / distanceBetweenAirports) * 100;
  }

  const handleClickMap = () => {
    setMapShowed(!mapShowed);
    setLogsShowed(false);
  };

  const handleClickLogs = () => {
    setMapShowed(false);
    setLogsShowed(!logsShowed);
  };

  const handleSubmitPirep = () => {
    window.electron.ipcRenderer.sendMessage('SUBMIT_PIREP', {});
  };

  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on(
      EventsType.SUBMIT_PIREP_RESPONSE,
      (data: SubmitPirepResponse) => {
        if (data.success) {
          navigateInsideWorkspace(navigate, workspaceId, '/pireps');
          setAcars(null);
        }
      }
    );

    return () => removeListener();
  }, []);

  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on(
      EventsType.TRACKER,
      (data: Tracker) => {
        setAcars(data);
      }
    );

    return () => removeListener();
  }, []);

  let route: any[] = [];

  if (acars?.pirep) {
    route = acars?.pirep
      .route!.filter((route) => !route.is_sid_star)
      .sort((a, b) => a.index - b.index);
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.flightHeader}>
        <Title className={styles.title} black>
          <>Flight {acars?.pirep?.flightNumber}</>
        </Title>
        <Title className={styles.code} black>
          <>Tracking code: {acars?.trackerId}</>
        </Title>
      </div>
      <div className={styles.tabs}>
        <div className={styles.container}>
          <div onClick={handleClickMap} className={styles.mapHeader}>
            {mapShowed ? (
              <>
                <Title className={styles.header}>Hide Map</Title>
                <FontAwesomeIcon
                  className={styles.headerIcon}
                  icon={faCaretUp}
                />
              </>
            ) : (
              <>
                <Title className={styles.header}>Show Map</Title>
                <FontAwesomeIcon
                  className={styles.headerIcon}
                  icon={faCaretDown}
                />
              </>
            )}
          </div>
          {mapShowed && (
            <div className={styles.mapWrapper}>
              <Map mapRef={mapRef}>
                <>
                  {acars && acars.pirep && acars.acars && (
                    <>
                      <MarkerOnMap
                        value={acars?.pirep.origin!.id}
                        onClick={() => {}}
                        tooltip={`${acars?.pirep.origin!.name}`}
                        key={acars.pirep.origin!.id}
                        icon={departureIcon}
                        position={[
                          acars.pirep.origin!.lat,
                          acars.pirep.origin!.lng,
                        ]}
                      />

                      {acars?.pirep
                        .route!.filter((route) => !route.is_sid_star)
                        .map((route) => {
                          return (
                            <MarkerOnMap
                              value={route.id}
                              onClick={() => {}}
                              tooltip={`${route.ident}`}
                              key={route.id}
                              icon={routeIcon}
                              position={[
                                Number(route.pos_lat),
                                Number(route.pos_lng),
                              ]}
                            />
                          );
                        })}

                      {route && (
                        <RoutePath
                          route={route}
                          origin={acars.pirep.origin}
                          destination={acars.pirep.destination}
                        />
                      )}

                      <MarkerOnMap
                        value={acars.pirep.destination!.id}
                        onClick={() => {}}
                        tooltip={`${acars.pirep.destination!.name}`}
                        key={acars.pirep.destination!.id}
                        icon={arrivalIcon}
                        position={[
                          acars.pirep.destination!.lat,
                          acars.pirep.destination!.lng,
                        ]}
                      />

                      <MarkerOnMap
                        value={acars.trackerId}
                        icon={planeIcon}
                        position={[acars.acars.lat, acars.acars.lng]}
                      />
                    </>
                  )}
                </>
              </Map>
            </div>
          )}
        </div>

        <div className={styles.container}>
          <div onClick={handleClickLogs} className={styles.logsHeader}>
            {logsShowed ? (
              <>
                <Title className={styles.header}>Hide Logs</Title>
                <FontAwesomeIcon
                  className={styles.headerIcon}
                  icon={faCaretUp}
                />
              </>
            ) : (
              <>
                <Title className={styles.header}>Show Logs</Title>
                <FontAwesomeIcon
                  className={styles.headerIcon}
                  icon={faCaretDown}
                />
              </>
            )}
          </div>

          {logsShowed && (
            <div className={styles.logs}>
              <Logs logs={acars?.acars.logs ?? []} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.progressWrapper}>
        <FlightProgress percent={progress} />
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.topText}>{actualDistance}nm</div>
          <div className={styles.bottomText}>Distance To Destination</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.topText}>{acars?.acars.flightPhase}</div>
          <div className={styles.bottomText}>Flight Phase</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.topText}>
            {moment(
              acars?.acars.times.estimatedOffBlockTime ?? new Date()
            ).format('HH:mm')}
          </div>
          <div className={styles.bottomText}>Estimated Off-Block</div>
        </div>
        <div className={styles.stat}>
          <Tooltip placement="top" title="Blocked by company settings">
            <div className={styles.blocked}>
              <FontAwesomeIcon className={styles.blockedIcon} icon={faLock} />
            </div>
          </Tooltip>
          <div className={styles.topText}>
            <Rating name="read-only" value={2.5} precision={0.5} readOnly />
          </div>
          <div className={styles.bottomText}>Estimated Flight Rating</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <RoundedButton className={styles.cancelButton}>Cancel</RoundedButton>
        <RoundedButton
          onClick={handleSubmitPirep}
          className={styles.submitButton}
        >
          Submit
        </RoundedButton>
      </div>
    </div>
  );
};

export default Flight;
