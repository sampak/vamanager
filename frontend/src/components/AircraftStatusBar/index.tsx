import { FC, Props } from './typings';
import styles from './styles.module.scss';

const AircraftStatusBar: FC<Props> = ({ percent }) => {
  const getColor = () => {
    if (percent >= 50) {
      return styles.bestCondition;
    }

    if (percent >= 35) {
      return styles.goodCondition;
    }

    return styles.badCondition;
  };

  const color = getColor();

  return (
    <div className={styles.bar}>
      <div
        style={{
          background: color,
          width: `${percent}%`,
        }}
        className={styles.progress}
      ></div>
      <div className={styles.text}>{percent}%</div>
    </div>
  );
};

export default AircraftStatusBar;
