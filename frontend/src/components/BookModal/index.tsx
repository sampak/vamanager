import { FC, Props } from './typing';
import styles from './styles.module.scss';
import SmallModal from 'components/SmallModal';
import Title from 'components/Title';
import SelectAircraft from 'components/SelectAircraft';
import Aircraft from '@shared/base/Aircraft';
import { useState, useEffect } from 'react';
import Input from 'components/Input';
import RoundedButton from 'components/RoundedButton';
import CTAButton from 'components/CTAButton';
import { useParams } from 'react-router-dom';
import pirepService from 'api/pirepService';
import { getAPIError } from 'utils/getAPIError';
import { useTranslation } from 'react-i18next';
import ErrorNoti from 'components/ErrorNoti';

const BookModal: FC<Props> = ({ isOpen, schedule, setToggle }) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`bookModal.${key}`);
  const { workspaceId } = useParams();
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(
    null
  );

  const [callsign, setCallsign] = useState(schedule?.callsign);

  const [valid, setValid] = useState(false);
  const [simbriefWindow, setSimbriefWindow] = useState<Window | null>();
  const [intervalWindow, setIntervalWindow] = useState<NodeJS.Timer | null>();

  const { mutate: createPirep } = pirepService.useCreatePirep();
  const { mutate: updatePirep } = pirepService.useUpdatePirep();

  const [error, setError] = useState('');

  useEffect(() => {
    if (simbriefWindow === null && intervalWindow) {
      clearInterval(intervalWindow);
      setIntervalWindow(null);
    }
  }, [simbriefWindow]);

  const checkWindowState = (window: Window, pirepID: string) => {
    if (!window) {
      return;
    }
    if (window.closed) {
      setSimbriefWindow(null);

      updatePirep(
        {
          workspaceID: workspaceId!,
          pirepID: pirepID,
        },
        {
          onSuccess: (response) => {
            handleClose();
          },
          onError: (err: any) => {
            setError(getAPIError(err, t));
          },
        }
      );
    }
  };

  const validation = () => {
    if (!selectedAircraft) {
      setValid(false);
      return;
    }

    if (callsign?.trim()?.length! <= 3) {
      setValid(false);
      return;
    }

    setValid(true);
  };

  useEffect(() => {
    validation();
  }, [callsign, selectedAircraft]);

  const handleWindow = () => {
    createPirep(
      {
        workspaceID: workspaceId!,
        scheduleID: schedule?.id!,
        payload: {
          aircraftID: selectedAircraft!.id,
        },
      },
      {
        onSuccess: (response) => {
          const newWindow = window.open(
            response.data.url,
            'simbriefWindow',
            'height=600,width=400'
          );
          setSimbriefWindow(newWindow);

          const newInterval = setInterval(
            () => checkWindowState(newWindow!, response.data.key),
            1000
          );
          setIntervalWindow(newInterval);
        },
        onError: (err: any) => {
          setError(getAPIError(err, t));
        },
      }
    );
  };

  const handleClose = () => {
    setToggle(false);
    setError('');
  };

  return (
    <SmallModal isOpen={isOpen} handleClose={setToggle}>
      <div className={styles.wrapper}>
        {!!error.length && <ErrorNoti className={styles.error} text={error} />}
        <Title black>{t('title')}</Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleWindow();
          }}
        >
          <div className={styles.callsign}>
            <Input
              label={t('callLabel')}
              placeholder={t('callPlaceholder')}
              onChange={(e) => setCallsign(e.target.value)}
              value={callsign!}
            />
          </div>
          <div className={styles.selectorWrapper}>
            <SelectAircraft
              aircraftType={schedule?.typeOfAircraft?.type!}
              label={t('airLabel')}
              placeholder={t('airPlaceholder')}
              onChange={(aircraft) => setSelectedAircraft(aircraft)}
            />
          </div>
          <div className={styles.buttons}>
            <CTAButton onClick={handleClose} text={t('cancelButton')} />
            <RoundedButton
              type="submit"
              disabled={!valid}
              className={styles.button}
            >
              {t('acceptButton')}
            </RoundedButton>
          </div>
        </form>
      </div>
    </SmallModal>
  );
};

export default BookModal;
