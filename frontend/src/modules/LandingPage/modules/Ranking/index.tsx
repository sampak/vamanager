import Airline from '@shared/base/Airline';
import { Membership } from '@shared/base/Membership';
import { User } from '@shared/base/User';
import statsService from 'api/statsService';
import LoadingScreen from 'components/LoadingScreen';
import Title from 'components/Title';
import RankingCard from 'modules/LandingPage/components/RankingCard';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getName } from 'utils/getName';
import styles from './styles.module.scss';

const Ranking = () => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`ranking.${key}`);
  const { data: rankingData, isLoading } = statsService.useGetRanking();

  const airlines = useMemo(
    () => rankingData?.data.airlines ?? [],
    [rankingData]
  );

  const users = useMemo(() => rankingData?.data.users ?? [], [rankingData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        <div className={styles.header}>
          <Title className={styles.text}>{t('airlines')}</Title>
        </div>
        <div className={styles.list}>
          {airlines.map((airline: Airline, index) => (
            <RankingCard
              key={airline.id}
              index={index + 1}
              avatar={airline.image}
              name={airline.name}
              // @ts-ignore
              rating={airline.rating * 100}
            />
          ))}
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <Title className={styles.text}>{t('users')}</Title>
        </div>
        <div className={styles.list}>
          {users.map((user: User, index) => (
            <RankingCard
              key={user.id}
              index={index + 1}
              avatar={''}
              name={user ? getName(user) : ''}
              // @ts-ignore
              rating={user.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
