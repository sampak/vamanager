import pirepService from 'api/pirepService';
import PirepCard from 'components/PirepCard';
import Title from 'components/Title';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

const Pireps = () => {
  const { workspaceId } = useParams();
  const { data: pirepsData } = pirepService.useGetPireps(workspaceId!);

  const pireps = useMemo(() => pirepsData?.data ?? [], [pirepsData]);

  return (
    <div className={styles.wrapper}>
      <Title className={styles.header} black>
        Pireps
      </Title>

      <div className={styles.list}>
        {pireps.map((pirep) => (
          <PirepCard pirep={pirep} />
        ))}
      </div>
    </div>
  );
};

export default Pireps;
