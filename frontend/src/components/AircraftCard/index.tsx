import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Title from 'components/Title';
import AircraftStatusBar from 'components/AircraftStatusBar';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFeature } from '@growthbook/growthbook-react';
import DropdownMenu from 'components/DropdownMenu';
import { FeatureFlags } from '@shared/base/FeatureFlags';
import { useState } from 'react';
import DropdownMenuV2 from 'components/DropdownMenuv2';

const AircraftCard: FC<Props> = ({ aircraft }) => {
  const [menu, setMenu] = useState(false);
  const isAircraftConditionEnabled = useFeature(
    FeatureFlags.AIRCRAFT_CONDITION
  ).on;
  const sellAircraft = () => {
    console.log('clicked');
  };

  const options = [
    { text: 'Change Image', onClick: sellAircraft },
    { text: 'Sell', onClick: sellAircraft },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={aircraft.image} />
      </div>
      <div onClick={() => setMenu(!menu)} className={styles.overflowMenu}>
        <DropdownMenuV2 options={options} />
      </div>
      <div className={styles.description}>
        <Title className={styles.name} black>
          {`${aircraft.type.name}`}
        </Title>
      </div>

      <div className={styles.context}>
        <div className={styles.info}>Reg. {aircraft.registration}</div>
        <div className={styles.info}>{aircraft.miles} miles</div>
        {/* <div className={styles.info}>last flight: EPWA -&gt; EPWR</div> */}
      </div>
      {isAircraftConditionEnabled && (
        <div className={styles.barWrapper}>
          <Title className={styles.barTitle} black>
            Conditon:
          </Title>
          <AircraftStatusBar percent={100} />
        </div>
      )}
    </div>
  );
};

export default AircraftCard;
