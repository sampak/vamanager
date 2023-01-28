import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleRight,
  faPlane,
  faClock,
  faEllipsis,
  faMap,
} from '@fortawesome/free-solid-svg-icons';
import Badge from 'components/Badge';
import OutlineBadge from 'components/OutlineBadge';
import AuthContext from 'contexts/auth';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import DropdownMenu from 'components/DropdownMenu';
import { useTranslation } from 'react-i18next';
const ScheduleCard: FC<Props> = ({ schedule, removeSchedule }) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`schedules.card.${key}`);
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
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

  return (
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
            <div onClick={() => setMenu(!menu)} className={styles.overflowMenu}>
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
      <div className={styles.buttonWrapper}>
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
  );
};

export default ScheduleCard;
