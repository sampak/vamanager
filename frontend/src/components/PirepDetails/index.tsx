import { FC, Props } from './typings';
import styles from './styles.module.scss';
import PirepStat from 'components/PirepStat';
import {
  faClock,
  faGasPump,
  faMoneyBill,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faStar,
  faUsers,
  faWeightHanging,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Rating } from '@mui/material';
import { PirepStatus } from '@shared/base/PirepStatus';
import { Rating as IRating } from '@shared/base/Rating';
import { convertRating } from 'utils/convertRating';
import { useTranslation } from 'react-i18next';

const PirepDetails: FC<Props> = ({ pirep }) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`pirep.details.${key}`);

  const salary = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(pirep!.salary!);

  const isFlightEnded = pirep!.status !== PirepStatus.CREATED;

  return (
    <div className={styles.stats}>
      <PirepStat
        headerText={t('aircraft')}
        icon={faPlane}
        text={pirep?.aircraft?.type?.type ?? ''}
        placeholder={pirep?.aircraft?.type?.name ?? ''}
      />
      <PirepStat
        headerText={t('departure')}
        icon={faPlaneDeparture}
        text={pirep.origin?.icao ?? ''}
        placeholder={pirep?.origin?.name ?? ''}
      />
      <PirepStat
        headerText={t('arrival')}
        icon={faPlaneArrival}
        text={pirep.destination?.icao ?? ''}
        placeholder={pirep?.destination?.name ?? ''}
      />
      <PirepStat
        headerText={isFlightEnded ? t('flightTime') : t('estimatedFlightTime')}
        icon={faClock}
        text={
          isFlightEnded
            ? String(moment.utc(pirep?.flightTime * 1000).format('HH:mm')) ?? ''
            : String(
                moment.utc(pirep?.estimatedFlightTime * 1000).format('HH:mm')
              ) ?? ''
        }
        placeholder={isFlightEnded ? t('flightTime') : t('estimatedFlightTime')}
      />
      <PirepStat
        headerText={t('TOW')}
        icon={faWeightHanging}
        text={String(pirep?.est_tow) ?? ''}
        placeholder={'KGS'}
      />
      {!isFlightEnded && (
        <PirepStat
          headerText={t('estimatedBlockFuel')}
          icon={faGasPump}
          text={String(pirep?.estimatedFuel) ?? ''}
          placeholder={'KGS'}
        />
      )}
      {isFlightEnded && (
        <PirepStat
          headerText={t('blockFuel')}
          icon={faGasPump}
          text={String(pirep?.blockFuel) ?? ''}
          placeholder={'KGS'}
        />
      )}

      {isFlightEnded && (
        <PirepStat
          headerText={t('usedFuel')}
          icon={faGasPump}
          text={String(pirep?.fuel_burned) ?? ''}
          placeholder={'KGS'}
        />
      )}
      <PirepStat
        headerText={t('passangers')}
        placeholder={isFlightEnded ? t('passangers') : t('estimatedPassangers')}
        icon={faUsers}
        text={String(pirep?.passangers) ?? ''}
      />
      {isFlightEnded && (
        <PirepStat
          placeholder={t('rate')}
          headerText={t('rate')}
          icon={faStar}
          text={String(pirep?.landing_rate)}
        />
      )}
      <PirepStat
        placeholder={isFlightEnded ? t('salary') : t('estimatedSalary')}
        headerText={t('salary')}
        icon={faMoneyBill}
        text={salary}
      />
      {isFlightEnded && (
        <PirepStat
          icon={faStar}
          headerText={t('flightRating')}
          placeholder={t(pirep?.flightRating ?? IRating.GOOD)}
        >
          <Rating
            name="read-only"
            value={convertRating(pirep?.flightRating ?? IRating.GOOD)}
            precision={0.5}
            readOnly
          />
        </PirepStat>
      )}
    </div>
  );
};

export default PirepDetails;
