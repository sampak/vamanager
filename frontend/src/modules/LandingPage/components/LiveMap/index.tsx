import { useRef } from 'react';
import styles from './styles.module.scss';
import Map from 'components/Map';

const LiveMap = () => {
  const mapRef = useRef(null);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>LIVE FLIGHTS 0</div>
      <div className={styles.arrowDown}></div>
      <div className={styles.mapWrapper}>
        <Map mapRef={mapRef}></Map>
      </div>
    </div>
  );
};

export default LiveMap;
