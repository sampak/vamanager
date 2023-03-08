import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleRight,
  faPlane,
  faClock,
  faEllipsis,
  faMap,
  faCaretUp,
  faCaretDown,
  faPlaneDeparture,
  faPlaneArrival,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import Badge from 'components/Badge';
import OutlineBadge from 'components/OutlineBadge';
import AuthContext from 'contexts/auth';
import { useContext, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import DropdownMenu from 'components/DropdownMenu';
import { useTranslation } from 'react-i18next';
import BookModal from 'components/BookModal';
import Map from 'components/Map';
import MarkerOnMap from 'components/MarkerOnMap';
import { createLeafletIcon } from 'utils/createLeafletIcon';
import RoutePath from 'components/RoutePath';
import classNames from 'classnames';
import { getCenterBetweenTwoPoints } from 'utils/getCenterBetweenTwoPoints';
import { calculateZoom } from 'utils/calculateZoom';
const ScheduleCard: FC<Props> = ({
  schedule,
  removeSchedule,
  setBookSchedule,
  setIsBookModal,
}) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`schedules.card.${key}`);
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const [isMapShowed, setIsMapShowed] = useState(false);

  const departureIcon = createLeafletIcon(faPlaneDeparture, styles.icon);
  const arrivalIcon = createLeafletIcon(faPlaneArrival, styles.icon);

  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef(null);
  const [options, setOptions] = useState<
    { text: string; onClick: () => void }[]
  >([]);

  const createOptions = () => {
    const newOptions: { text: string; onClick: () => void }[] = [];
    if (schedule.uiConfiguration?.delete) {
      newOptions.push({
        text: t('remove'),
        onClick: () => removeSchedule(schedule.id),
      });
    }

    setOptions(newOptions);
  };

  useEffect(() => {
    createOptions();
  }, []);

  const handleClick = () => {
    setBookSchedule(schedule);
    setIsBookModal(true);
  };

  const isMapShowedStyle = isMapShowed ? styles.mapShowed : '';

  const centerPoint = getCenterBetweenTwoPoints(
    schedule.origin!.lat,
    schedule.origin!.lng,
    schedule.destination!.lat,
    schedule.destination!.lng
  );

  const [zoom, setZoom] = useState(4);

  const getZoom = (width: number) => {
    let newZoom = calculateZoom(
      schedule.origin!.lat,
      schedule.origin!.lng,
      schedule.destination!.lat,
      schedule.destination!.lng,
      width
    );

    setZoom(newZoom);
  };

  useEffect(() => {
    if (ref.current) {
      getZoom(ref.current.clientWidth);
    }
  }, [ref, isMapShowed]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.progress}></div>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.airline}>
              <img src={user?.membership?.airline?.image} />
              {schedule.flightNumber}
            </div>
            <div className={styles.options}>
              <Badge text={t(schedule.type)} />
              <OutlineBadge>
                <div className={styles.badge}>
                  <FontAwesomeIcon icon={faMap} />
                  {schedule.airDistance} nm
                </div>
              </OutlineBadge>
              <OutlineBadge>
                <div className={styles.badge}>
                  <FontAwesomeIcon icon={faPlane} />
                  {schedule.typeOfAircraft?.type}
                </div>
              </OutlineBadge>
              <OutlineBadge>
                <div className={styles.badge}>
                  <FontAwesomeIcon icon={faClock} />
                  {moment.utc(schedule.flightTime * 1000).format('HH:mm')}
                </div>
              </OutlineBadge>
              <div
                onClick={() => setMenu(!menu)}
                className={styles.overflowMenu}
              >
                {!!options.length && <FontAwesomeIcon icon={faEllipsis} />}
                <DropdownMenu
                  className={styles.dropdown}
                  toggle={setMenu}
                  isOpen={menu}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className={styles.flightInformation}>
            <div className={styles.airport}>
              <div className={styles.name}>{schedule.origin?.name}</div>
              <div className={styles.icao}>{schedule.origin?.icao}</div>
            </div>
            <div className={styles.line}>
              <FontAwesomeIcon className={styles.flyIcon} icon={faPlane} />
            </div>
            <div className={styles.airport}>
              <div className={styles.name}>{schedule.destination?.name}</div>
              <div className={styles.icao}>{schedule.destination?.icao}</div>
            </div>
          </div>
        </div>
        <div onClick={() => handleClick()} className={styles.buttonWrapper}>
          <div className={styles.priceWrapper}>
            <div className={styles.estimated}>{t('salary')}</div>
            <div className={styles.price}>
              {new Intl.NumberFormat('en-EN', {
                style: 'currency',
                currency: 'USD',
              }).format(schedule!.salary!)}
            </div>
          </div>
          <div className={styles.button}>
            {t('book')} <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className={classNames(styles.mapWrapper, isMapShowedStyle)}
      >
        {isMapShowed && (
          <Map center={centerPoint} zoom={zoom} mapRef={mapRef}>
            <>
              {/* Departure icon */}
              <MarkerOnMap
                value={schedule.origin!.id}
                onClick={() => {}}
                tooltip={`${schedule.origin!.name}`}
                key={schedule.origin!.id}
                icon={departureIcon}
                position={[schedule.origin!.lat, schedule.origin!.lng]}
              />

              <RoutePath
                color={styles.lineColor}
                origin={schedule.origin}
                destination={schedule.destination}
              />

              {/* Arrival Icon */}
              <MarkerOnMap
                value={schedule.destination!.id}
                onClick={() => {}}
                tooltip={`${schedule.destination!.name}`}
                key={schedule.destination!.id}
                icon={arrivalIcon}
                position={[
                  schedule.destination!.lat,
                  schedule.destination!.lng,
                ]}
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
            {t('hide')} <FontAwesomeIcon icon={faCaretUp} />
          </>
        ) : (
          <>
            {t('show')} <FontAwesomeIcon icon={faCaretDown} />
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;
