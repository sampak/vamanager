import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Title from 'components/Title';
import { Rating } from '@mui/material';
import classNames from 'classnames';
import UserAvatar from 'components/UserAvatar';
import DefaultAvatar from 'components/DefaultAvatar';

const RankingCard: FC<Props> = ({ index, avatar, name, rating }) => {
  const elo = ((rating as number) / 1000) * 100;
  const stars = (elo * 5) / 100;

  const isGold = index === 1 && styles.gold;
  const isSilver = index === 2 && styles.silver;
  const isBronze = index === 3 && styles.bronze;
  const isNon = !isGold && !isSilver && !isBronze && styles.normal;

  return (
    <div className={styles.wrapper}>
      <div className={styles.data}>
        <div
          className={classNames(
            styles.index,
            isGold,
            isSilver,
            isBronze,
            isNon
          )}
        >
          {index}
        </div>
        {avatar ? (
          <img src={avatar} className={styles.avatar} alt={`Avatar ${name}`} />
        ) : (
          <DefaultAvatar className={styles.avatar} name={name} />
        )}
        <Title className={styles.name} black>
          {name}
        </Title>
      </div>
      <div className={styles.rating}>
        <Rating name="read-only" value={stars} precision={0.5} readOnly />
      </div>
    </div>
  );
};

export default RankingCard;
