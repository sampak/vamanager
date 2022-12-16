import { FC } from './typings';
import styles from './styles.module.scss';
import OnbordingHeader from 'components/OnbordingHeader';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AirlineCard from 'components/AirlineCard';
import airlineService from 'api/airlineService';
import { useMemo } from 'react';
import Airline from '@shared/base/Airline';
import { JoiningMethod } from '@shared/base/JoiningMethod';
import userService from 'api/userService';
import { getToken } from 'api/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const OnbordingJoin: FC = () => {
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`onbording.method.${key}`);
  const { data: airlinesData } = airlineService.useGetAllAirlines();
  const { mutate: joinToAirline, isLoading } =
    airlineService.useJoinToAirline();
  const { refetch } = userService.useGetMe(getToken());
  const airlines = useMemo(() => airlinesData?.data, [airlinesData]);

  const handleClickJoin = (airline: Airline) => {
    joinToAirline(
      {
        id: airline.id,
      },
      {
        onSuccess: () => {
          refetch();
          if (airline.joining_type === JoiningMethod.PUBLIC_ACCESS) {
            navigate(`/workspace/${airline.icao}`);
            return;
          }
          navigate(`/choose-workspace`);
        },
      }
    );
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <OnbordingHeader
          title={'Choose Company'}
          subTitle={'Choose your first company and start your adventure!'}
          steps={[]}
          activeStep={1}
        />
      </div>
      <div
        onClick={() => navigate('/onbording/method')}
        className={styles.backButton}
      >
        <FontAwesomeIcon className={styles.backIcon} icon={faArrowLeft} />
        Back
      </div>
      <div className={styles.container}>
        {airlines?.map((airline) => (
          <AirlineCard onClick={handleClickJoin} airline={airline} />
        ))}
      </div>
    </div>
  );
};

export default OnbordingJoin;
