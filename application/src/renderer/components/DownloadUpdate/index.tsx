import { FC, Props } from './typing';
import styles from './styles.module.scss';
import Logo from '../Logo';

function formatSizeUnits(bytes: number) {
  if (bytes >= 1073741824) {
    bytes = Number((bytes / 1073741824).toFixed(2));
  } else if (bytes >= 1048576) {
    bytes = Number((bytes / 1048576).toFixed(2));
  } else if (bytes >= 1024) {
    bytes = Number((bytes / 1024).toFixed(2));
  } else if (bytes > 1) {
    bytes = bytes;
  } else if (bytes == 1) {
    bytes = bytes;
  } else {
    bytes = 0;
  }
  return bytes;
}

const DownloadUpdate: FC<Props> = ({ percent, downloaded, size }) => {
  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />

      <div className={styles.progressData}>
        <div className={styles.percent}>{Math.floor(percent)}%</div>
        <div className={styles.size}>
          {formatSizeUnits(downloaded)}mb/
          {size !== 0 ? formatSizeUnits(size) : '?'}mb
        </div>
      </div>
      <div className={styles.bar}>
        <div style={{ width: `${percent}%` }} className={styles.status}></div>
      </div>
    </div>
  );
};

export default DownloadUpdate;
