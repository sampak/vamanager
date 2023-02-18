import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Button from '../Button';
import moment from 'moment';

const PirepCard: FC<Props> = ({
  pirep,
  onClick,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.flightNumber}>{pirep.flightNumber}</div>
      <div className={styles.flight}>
        {pirep.origin?.icao} - {pirep.destination?.icao}
      </div>
      <div className={styles.time}>
        {moment.utc(pirep.estimatedFlightTime * 1000).format('HH:mm')}
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
  );
};

export default PirepCard;
