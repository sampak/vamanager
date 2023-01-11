import aircraftService from 'api/aircraftService';
import AircraftDealerCard from 'components/AircraftDealerCard';
import BackButton from 'components/BackButton';
import ErrorNoti from 'components/ErrorNoti';
import Loading from 'components/Loading';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { getAPIError } from 'utils/getAPIError';
import { navigateInsideWorkspace } from 'utils/navigateInsideWorkspace';
import styles from './styles.module.scss';

const AircraftDealer = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`aircraftDealer.${key}`);
  const [error, setError] = useState('');
  const { data, isFetching } = aircraftService.useGetAllDealerAircrafts(
    workspaceId!
  );
  const { mutate: buyAircraft } = aircraftService.useBuyAircraft();
  const aircrafts = useMemo(() => data?.data ?? [], [data]);

  const handleBuyButton = async (aircraft, registration) => {
    setError('');
    const registrationWithoutSpecialCharacters = registration.replaceAll(
      '-',
      ''
    );

    if (registrationWithoutSpecialCharacters.length !== 5) {
      console.log('validation failed');
      return false;
    }

    const fixedRegistration = `${registrationWithoutSpecialCharacters.substring(
      0,
      2
    )}-${registrationWithoutSpecialCharacters.substring(2, 5)}`;

    buyAircraft(
      {
        workspaceID: workspaceId!,
        aircraftID: aircraft.id,
        registreation: fixedRegistration,
      },
      {
        onSuccess: () => {
          navigateInsideWorkspace(navigate, workspaceId, '/aircrafts');
        },
        onError: (error: any) => {
          setError(getAPIError(error, t));
        },
      }
    );

    return true;
  };

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <BackButton onClick={() => navigate(-1)} text="Back To Aircrafts" />
          {!!error.length && <ErrorNoti className={styles.noti} text={error} />}
          <div className={styles.cardsWrapper}>
            {aircrafts.map((aircraft) => (
              <AircraftDealerCard
                isFetching={isFetching}
                onClick={handleBuyButton}
                aircraft={aircraft}
                key={aircraft.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AircraftDealer;
