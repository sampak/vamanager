import { Pirep } from '@shared/base/Pirep';
import { EventsType } from '../../../../../dto/Events';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../../../components/Title';
import pirepService from '../../../../api/pirepService';
import PirepCard from '../../../../components/PirepCard';
import styles from './styles.module.scss';
import ErrorNoti from '../../../../components/ErrorNoti';
import { navigateInsideWorkspace } from 'renderer/utils/navigateInsideWorkspace';
import { Acars } from '../../../../../main/simConnect/typings';
import AcarsContext from 'renderer/contexts/acars';

const Pireps = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { data: pirepsData } = pirepService.useGetPireps(workspaceId!);
  const pireps: Pirep[] = useMemo(() => pirepsData?.data ?? [], [pirepsData]);
  const [selectedPirep, setSelectedPirep] = useState<Pirep | null>(null);

  const [isCheckingSimStatus, setIsCheckingSimStatus] = useState(false);

  const [error, setError] = useState('');
  const { acars, setAcars } = useContext(AcarsContext);

  const startTrackingFlight = () => {
    console.log('Sending request to start flight tracking...');
    window.electron.ipcRenderer.sendMessage(EventsType.START_TRACKING, {});
  };

  const handleClick = (pirep: Pirep) => {
    setError('');
    setSelectedPirep(pirep);
    setIsCheckingSimStatus(true);
    console.log('Sending request to check sim status...');
    window.electron.ipcRenderer.sendMessage(EventsType.CHECK_SIM_STATUS, {});
    window.electron.ipcRenderer.sendMessage(EventsType.SET_PIREP, {
      pirep: pirep,
    });
  };

  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on(
      EventsType.TRACKING_STATUS,
      (data: {
        canTrack: boolean;
        trackerId: string;
        pirep: Pirep;
        acars: Acars;
        distance: number;
        error: any;
      }) => {
        if (!data.canTrack) {
          if (data.error.statusCode === 400) {
            if (data.error.message === 'Aircraft') {
              setError('Type of aircraft is invalid');
              return;
            }

            if (data.error.message === 'AIRLINE') {
              setError('Provided airline is not exist');
              return;
            }

            if (data.error.message === 'PIREP') {
              setError('Booked flight is not exist');
              return;
            }

            if (data.error.message === 'DISTANCE') {
              setError('You far away from origin airport');
              return;
            }
            if (data.error.message === 'ONGROUND') {
              setError('Your aircraft is not on the ground');
              return;
            }
            console.log(data.error);
            setError('Something wrong with server try again later');
            return;
          }
          return;
        }
        setAcars({
          acars: data.acars,
          pirep: data.pirep,
          trackerId: data.trackerId,
          distance: data.distance,
        });
        navigateInsideWorkspace(navigate, workspaceId, '/flight');
      }
    );

    return () => removeListener();
  }, []);

  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on(
      EventsType.CHECK_SIM_STATUS,
      (data: { connection: boolean; sim: string }) => {
        setIsCheckingSimStatus(false);
        if (data.connection === false) {
          setError(
            'Cannot connect to the simulator check that the simulator is running and the fsuipc addon is working'
          );
          return;
        }
        startTrackingFlight();
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
            isLoading={isCheckingSimStatus && pirep.id === selectedPirep?.id}
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
