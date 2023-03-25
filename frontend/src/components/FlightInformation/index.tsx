import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlane } from '@fortawesome/free-solid-svg-icons';
import FlightProgress from 'components/FlightProgress';
import { Rating } from '@mui/material';
import { getName } from 'utils/getName';
import { metersToNauticalMiles } from 'utils/metersToNauticalMiles';
import DefaultAvatar from 'components/DefaultAvatar';
import LoadingIcon from 'components/LoadingIcon';

const FlightInformation: FC<Props> = ({ LiveMap, informations, toggle }) => {
  const estimatedDistance = informations?.estimatedDistance;
  const actualDistance = metersToNauticalMiles(LiveMap.distance);

  let progress = 0;

  if (estimatedDistance) {
    progress = 100 - (actualDistance / estimatedDistance) * 100;
  }

  const elo = ((informations?.rating as number) / 1000) * 100;
  const stars = (elo * 5) / 100;

  if (!informations) {
    return (
      <div className={styles.flightInformation}>
        <LoadingIcon />
      </div>
    );
  }

  return (
    <div className={styles.flightInformation}>
      <FontAwesomeIcon
        onClick={() => toggle(null)}
        className={styles.closeIcon}
        icon={faClose}
      />
      <div className={styles.where}>
        <div className={styles.airport}>
          <div className={styles.name}>{informations?.origin?.name}</div>
          <div className={styles.icao}>{informations?.origin?.icao}</div>
        </div>
        <div className={styles.line}>
          <FontAwesomeIcon className={styles.flyIcon} icon={faPlane} />
        </div>
        <div className={styles.airport}>
          <div className={styles.name}>{informations?.destination?.name}</div>
          <div className={styles.icao}>{informations?.destination?.icao}</div>
        </div>
      </div>

      <FlightProgress percent={progress} />
      <div className={styles.distance}>
        Distance: {Math.floor(actualDistance)}nm
      </div>

      <div className={styles.airlineInformation}>
        <div className={styles.info}>
          <div className={styles.placeholder}>Airline: </div>
          <div className={styles.value}>
            <div className={styles.image}>
              {!!informations?.airline?.image?.length ? (
                <img src={informations?.airline?.image} />
              ) : (
                <DefaultAvatar
                  className={styles.img}
                  name={informations?.airline?.name ?? ''}
                />
              )}
            </div>
            <div className={styles.airlineName}>
              {informations?.airline?.name}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pilotInformation}>
        <div className={styles.info}>
          <div className={styles.placeholder}>Pilot: </div>
          <div className={styles.value}>
            {informations?.pilot && getName(informations?.pilot)}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.placeholder}>Pilot Rating: </div>
          <div className={styles.value}>
            <Rating name="read-only" value={stars} precision={0.5} readOnly />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.placeholder}>Altiude: </div>
          <div className={styles.value}>{LiveMap.altitude} feet</div>
        </div>
        <div className={styles.info}>
          <div className={styles.placeholder}>Ground speed: </div>
          <div className={styles.value}>{LiveMap.gs} Knots</div>
        </div>
        <div className={styles.info}>
          <div className={styles.placeholder}>Heading: </div>
          <div className={styles.value}>{LiveMap.heading}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.placeholder}>Transponder: </div>
          <div className={styles.value}>{LiveMap.transponder}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.placeholder}>Flight Phase: </div>
          <div className={styles.value}>{LiveMap.flight_phase}</div>
        </div>
      </div>
    </div>
  );
};

export default FlightInformation;
