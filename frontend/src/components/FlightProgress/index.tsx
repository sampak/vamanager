import { FC, Props } from './typing';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const FlightProgress: FC<Props> = ({ percent }) => {
  if (percent > 100) {
    percent = 100;
  }

  if (percent < 0) {
    percent = 0;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div style={{ width: `${percent}%` }} className={styles.progress}></div>
        <FontAwesomeIcon
          style={{ left: `${percent}%` }}
          className={styles.airplane}
          icon={faPlane}
        />
      </div>
    </div>
  );
};

export default FlightProgress;
