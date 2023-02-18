import { Pirep } from '@shared/base/Pirep';
import { EventsType } from '../../../../../dto/Events';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../../../components/Title';
import pirepService from '../../../../api/pirepService';
import PirepCard from '../../../../components/PirepCard';
import styles from './styles.module.scss';
import ErrorNoti from '../../../../components/ErrorNoti';

const Pireps = () => {
  const { workspaceId } = useParams();
  const { data: pirepsData } = pirepService.useGetPireps(workspaceId!);
  const pireps: Pirep[] = useMemo(() => pirepsData?.data ?? [], [pirepsData]);
  const [selectedPirep, setSelectedPirep] = useState('');

  const [isCheckingSimStatus, setIsCheckingSimStatus] = useState(false);

  const [error, setError] = useState('');

  const handleClick = (pirep: Pirep) => {
    setError('');
    setSelectedPirep(pirep.id);
    setIsCheckingSimStatus(true);
    console.log('Sending request to check sim status...');
    window.electron.ipcRenderer.sendMessage(EventsType.CHECK_SIM_STATUS, {});
  };

  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on(
      EventsType.CHECK_SIM_STATUS,
      (data: { connection: boolean; sim: string }) => {
        if (data.connection === false) {
          setError(
            'Cannot connect to the simulator check that the simulator is running and the fsuipc addon is working'
          );
        }
        setIsCheckingSimStatus(false);
      }
    );

    return () => removeListener();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Title className={styles.title} black>
        Booked Flights
      </Title>
      {!!error.length && <ErrorNoti className={styles.error} text={error} />}
      <div className={styles.list}>
        {pireps.map((pirep) => (
          <PirepCard
            isLoading={isCheckingSimStatus && pirep.id === selectedPirep}
            isDisabled={isCheckingSimStatus}
            onClick={handleClick}
            pirep={pirep}
          />
        ))}
      </div>
    </div>
  );
};

export default Pireps;
