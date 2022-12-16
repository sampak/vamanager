import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { Avatar, Rating } from '@mui/material';
import Title from 'components/Title';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPlaneUp,
  faCalendar,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import RoundedButton from 'components/RoundedButton';
import Badge from 'components/Badge';
import { JoiningMethod } from '@shared/base/JoiningMethod';
import BodyText from 'components/BodyText';
import { useTranslation } from 'react-i18next';

const AirlineCard: FC<Props> = ({ airline, onClick }) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`airlineCard.${key}`);
  const buttonText = t(`buttons.${airline.joining_type}`);

  const elo = (1000 * (airline?.rating as number)) / 100;
  const stars = (elo * 5) / 100;

  return (
    <div className={styles.card}>
      <div className={styles.badgeContainer}>
        <Badge
          className={styles.badge}
          text={t(`badges.${airline.joining_type}`)}
        />
      </div>
      <div className={styles.airline}>
        <Avatar src={airline.image} className={styles.avatar}></Avatar>
        <div className={styles.titleContainer}>
          <Title className={styles.title} black>
            {airline.name}
          </Title>
          <BodyText>
            <div className={styles.rating}>
              <Rating name="read-only" value={stars} precision={0.5} readOnly />
            </div>
          </BodyText>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detail}>
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
          <div className={styles.text}>
            <span>{airline.memberships?.length}</span>
            {airline.memberships?.length === 1 ? t('pilot') : t('pilots')}
          </div>
        </div>
        <div className={styles.detail}>
          <FontAwesomeIcon className={styles.icon} icon={faPlaneUp} />
          <div className={styles.text}>
            <span>0</span>
            {t('aircraft')}
          </div>
        </div>
        <div className={styles.detail}>
          <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
          <div className={styles.text}>
            <span>0</span>
            {t('flight')}
          </div>
        </div>
      </div>

      <div className={styles.creatorContainer}>
        <div className={styles.creatorWrapper}>
          <Avatar className={styles.creatorAvatar}>
            {airline.owner?.firstName?.charAt(0)}
            {airline.owner?.lastName?.charAt(0)}
          </Avatar>
          {airline.owner?.firstName} {airline.owner?.lastName}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <RoundedButton
          onClick={() => onClick(airline)}
          className={styles.button}
        >
          {buttonText}
        </RoundedButton>
      </div>
    </div>
  );
};

export default AirlineCard;
