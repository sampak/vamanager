import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardCard: FC<Props> = ({ icon, children, subText }) => {
  return (
    <div className={styles.stat}>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.text}>{children}</div>
        <div className={styles.subText}>{subText}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
