import statsService from 'api/statsService';
import Loading from 'components/Loading';
import LoadingIcon from 'components/LoadingIcon';
import PirepCard from 'components/PirepCard';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

const LastPireps = () => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`landingPage.${key}`);

  const { data: pirepsData, isLoading } = statsService.useGetLastPireps();

  const pireps = useMemo(() => pirepsData?.data ?? [], [pirepsData]);

  if (!pireps.length && !isLoading) {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{t('pirepsHeader')}</div>
      <div className={styles.list}>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            {pireps.map((pirep) => (
              <PirepCard disableShow={true} pirep={pirep} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LastPireps;
