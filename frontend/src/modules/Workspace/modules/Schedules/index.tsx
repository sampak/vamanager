import { FC, Props } from './typings';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import ScheduleCard from 'components/ScheduleCard';
import Button from 'components/Button';
import scheduleService from 'api/scheduleService';
import { useState, useMemo, useContext } from 'react';
import CreateScheduleModal from 'components/CreateScheduleModal';
import Title from 'components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AuthContext from 'contexts/auth';
import Loading from 'components/Loading';
import { useTranslation } from 'react-i18next';

const Schedules: FC<Props> = () => {
  const { workspaceId } = useParams();
  const { user } = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);

  const translation = useTranslation();
  const t = (key: string) => translation.t(`schedules.${key}`);

  const {
    data: scheduleData,
    refetch: refetchSchedules,
    isFetching,
  } = scheduleService.useGetSchedules(workspaceId!);

  const { mutate: removeSchedule, isLoading } =
    scheduleService.useRemoveSchedule();

  const schedules = useMemo(() => scheduleData?.data ?? [], [scheduleData]);

  const handleRemoveSchedule = (scheduleID: string) => {
    removeSchedule(
      {
        workspaceId: workspaceId!,
        scheduleID: scheduleID,
      },
      {
        onSuccess: () => refetchSchedules(),
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title className={styles.title} black>
          <>Today Schedules ({schedules.length})</>
        </Title>
        {user?.uiConfiguration?.createSchedules && (
          <div onClick={() => setOpen(true)} className={styles.createButton}>
            <FontAwesomeIcon icon={faCirclePlus} /> {t('create')}
          </div>
        )}
      </div>
      <div className={styles.schedulesList}>
        {isFetching && <Loading className={styles.loading} />}
        {!isFetching && (
          <>
            {schedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                removeSchedule={handleRemoveSchedule}
                schedule={schedule}
              />
            ))}
          </>
        )}
      </div>

      <CreateScheduleModal
        refetchSchedules={refetchSchedules}
        isOpen={isOpen}
        toggle={setOpen}
      />
    </div>
  );
};

export default Schedules;
