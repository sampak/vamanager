import airlineService from 'api/airlineService';
import AircraftCard from 'components/AircraftCard';
import Loading from 'components/Loading';
import Title from 'components/Title';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from './components/EmptyState';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { navigateInsideWorkspace } from 'utils/navigateInsideWorkspace';
import { useNavigate } from 'react-router-dom';

const AircraftList = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = airlineService.useGetAircrafts(workspaceId!);
  const aircrafts = useMemo(() => data?.data ?? [], [data]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title black>Company Aircrafts</Title>
        <div
          onClick={() =>
            navigateInsideWorkspace(navigate, workspaceId, '/aircrafts/dealer')
          }
          className={styles.createButton}
        >
          <FontAwesomeIcon icon={faCirclePlus} /> Buy Aircraft
        </div>
      </div>
      {isFetching && <Loading className={styles.loading} />}
      {!isFetching && !aircrafts.length && <EmptyState />}
      {!isFetching && !!aircrafts.length && (
        <div className={styles.cardsWrapper}>
          {aircrafts.map((aircraft) => (
            <AircraftCard aircraft={aircraft} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AircraftList;
