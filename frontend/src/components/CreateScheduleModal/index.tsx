import { FC, Props } from './typings';
import styles from './styles.module.scss';
import BigModal from 'components/BigModal';
import Title from 'components/Title';
import { Formik } from 'formik';
import Input from 'components/Input';
import AirportSearch from 'components/AirportSearch';
import { useParams } from 'react-router-dom';
import RoundedButton from 'components/RoundedButton';
import CalendarInput from 'components/CalendarInput';
import CompanyAircraftTypesSearch from 'components/CompanyAircraftTypesSearch';
import BodyText from 'components/BodyText';
import scheduleService from 'api/scheduleService';
import { useState, useEffect } from 'react';
import createScheduleSchema from './validation.schema';
import { TypeOfSchedule } from '@shared/base/TypeOfSchedule';
import Dropdown from 'components/Dropdown';
import { useTranslation } from 'react-i18next';
import ErrorNoti from 'components/ErrorNoti';
import { getAPIError } from 'utils/getAPIError';

const CreateScheduleModal: FC<Props> = ({
  isOpen,
  toggle,
  refetchSchedules,
}) => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`createScheduleModal.${key}`);
  const { workspaceId } = useParams();
  const initialValues = {
    callsign: `${workspaceId}`,
    flightNumber: `${workspaceId?.at(0)}${workspaceId?.at(2)}`,
    type: TypeOfSchedule.ON_CERTAIN_DAYS,
    costIndex: '10',
    origin: '',
    destination: '',
    aircraft: '',
    route: '',
    day: new Date(),
    weekDay: 1,
  };

  const typesOfSchedule = [
    { value: TypeOfSchedule.EVERYDAY, text: t(TypeOfSchedule.EVERYDAY) },
    {
      value: TypeOfSchedule.ON_CERTAIN_DAYS,
      text: t(TypeOfSchedule.ON_CERTAIN_DAYS),
    },
    { value: TypeOfSchedule.ONCE, text: t(TypeOfSchedule.ONCE) },
  ];

  const days = [
    { value: 1, text: t('days.monday') },
    { value: 2, text: t('days.tuesday') },
    { value: 3, text: t('days.wednesday') },
    { value: 4, text: t('days.thursday') },
    { value: 5, text: t('days.friday') },
    { value: 6, text: t('days.saturday') },
    { value: 0, text: t('days.sunday') },
  ];

  const { mutate: createSchedule, isLoading: isCreatingSchedule } =
    scheduleService.useCreateSchedule();
  const { mutate: updateSchedule, isLoading: isUpdateSchedule } =
    scheduleService.useUpdateSchedule();
  const [simbriefWindow, setSimbriefWindow] = useState<Window | null>();
  const [intervalWindow, setIntervalWindow] = useState<NodeJS.Timer | null>();
  const [error, setError] = useState('');

  const isCreating = !!simbriefWindow || isCreatingSchedule || isUpdateSchedule;

  useEffect(() => {
    if (simbriefWindow === null && intervalWindow) {
      clearInterval(intervalWindow);
      setIntervalWindow(null);
    }
  }, [simbriefWindow]);

  const checkWindowState = (window: Window, staticID: string, resetForm) => {
    if (!window) {
      return;
    }
    if (window.closed) {
      setSimbriefWindow(null);

      updateSchedule(
        {
          workspaceId: workspaceId!,
          staticID: staticID,
        },
        {
          onSuccess: (response) => {
            resetForm();
            toggle(false);
            refetchSchedules();
          },
          onError: (err: any) => {
            setError(getAPIError(err, t));
          },
        }
      );
    }
  };

  const handleWindow = (values, resetForm) => {
    createSchedule(
      {
        workspaceId: workspaceId!,
        payload: values,
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
            () =>
              checkWindowState(newWindow!, response.data.scheduleId, resetForm),
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
    if (!isCreating) {
      toggle(false);
      setError('');
    }
  };

  return (
    <BigModal isOpen={isOpen} handleClose={handleClose}>
      <div className={styles.wrapper}>
        <Title black>{t('header')}</Title>
        {!!error.length && <ErrorNoti text={error} />}

        <Formik
          initialValues={initialValues}
          validationSchema={createScheduleSchema}
          onSubmit={() => {}}
          validateOnMount
          isInitialValid={false}
        >
          {({
            values,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            resetForm,
            isValid,
            errors,
          }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  !values.aircraft.length ||
                  !values.flightNumber.length ||
                  !values.origin.length ||
                  !values.destination.length ||
                  !isValid
                ) {
                  return;
                }
                handleWindow(values, resetForm);
              }}
              className={styles.form}
            >
              <div className={styles.columnsWrapper}>
                <Input
                  name="callsign"
                  type="text"
                  label={t('callsignLabel')}
                  placeholder={t('callsignPlaceholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.callsign}
                  error={
                    touched.callsign && errors.callsign ? errors.callsign : ''
                  }
                />
                <Input
                  name="flightNumber"
                  type="text"
                  label={t('flightLabel')}
                  placeholder={t('flightPlaceholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.flightNumber}
                />
                <AirportSearch
                  label={t('originLabel')}
                  onChange={(airport) => setFieldValue('origin', airport.id)}
                />
                <AirportSearch
                  label={t('destinationLabel')}
                  onChange={(airport) =>
                    setFieldValue('destination', airport.id)
                  }
                />
                <CompanyAircraftTypesSearch
                  label={t('aircraftLabel')}
                  onChange={(aircraft) =>
                    setFieldValue('aircraft', aircraft.id)
                  }
                />
                <Input
                  name="costIndex"
                  type="number"
                  label={t('costLabel')}
                  placeholder={t('costPlaceholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.costIndex}
                  error={
                    touched.costIndex && errors.costIndex
                      ? errors.costIndex
                      : ''
                  }
                />
                <Dropdown
                  onChangeValue={(option) =>
                    setFieldValue('type', option.value)
                  }
                  options={typesOfSchedule}
                  label={'Choose'}
                  value={values.type}
                />
                {values.type === TypeOfSchedule.ONCE && (
                  <CalendarInput
                    onChange={(date) => setFieldValue('day', date)}
                    label={t('pickDay')}
                  />
                )}
                {values.type === TypeOfSchedule.ON_CERTAIN_DAYS && (
                  <Dropdown
                    onChangeValue={(option) =>
                      setFieldValue('weekDay', option.value)
                    }
                    options={days}
                    label={'Choose'}
                    value={values.weekDay}
                  />
                )}
              </div>
              <Input
                name="route"
                type="text"
                label={t('routeLabel')}
                placeholder={t('routePlaceholder')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.route}
              />
              <div className={styles.bottomNavigation}>
                <BodyText className={styles.info}>{t('required')}</BodyText>
                <div className={styles.buttons}>
                  <RoundedButton
                    type="button"
                    className={styles.buttonBlack}
                    outline
                    onClick={handleClose}
                  >
                    {t('close')}
                  </RoundedButton>
                  <RoundedButton
                    isLoading={isCreating}
                    type="submit"
                    disabled={
                      !values.aircraft.length ||
                      !values.flightNumber.length ||
                      !values.origin.length ||
                      !values.destination.length ||
                      values.flightNumber.length < 3
                    }
                  >
                    {t('create')}
                  </RoundedButton>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </BigModal>
  );
};

export default CreateScheduleModal;
