import airlineService from 'api/airlineService';
import AircraftCard from 'components/AircraftCard';
import Loading from 'components/Loading';
import Title from 'components/Title';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from './components/EmptyState';
import styles from './styles.module.scss';

const AircraftList = () => {
  const { workspaceId } = useParams();
  const { data, isFetching } = airlineService.useGetAircrafts(workspaceId!);

  const aircrafts = useMemo(() => data?.data ?? [], [data]);
  return (
    <div className={styles.container}>
      <Title black>Company Aircrafts</Title>
      {isFetching && <Loading />}
      {!isFetching && !!aircrafts.length ? (
        <div className={styles.cardsWrapper}>
          {aircrafts.map((aircraft) => (
            <AircraftCard aircraft={aircraft} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default AircraftList;
