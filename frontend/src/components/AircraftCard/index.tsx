import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Title from 'components/Title';
import AircraftStatusBar from 'components/AircraftStatusBar';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFeature } from '@growthbook/growthbook-react';
import DropdownMenu from 'components/DropdownMenu';
import { FeatureFlags } from '@shared/base/FeatureFlags';
import { useState } from 'react';
import DropdownMenuV2 from 'components/DropdownMenuv2';
import aircraftService from 'api/aircraftService';
import { useParams } from 'react-router-dom';
import { getAPIError } from 'utils/getAPIError';
import { useTranslation } from 'react-i18next';
import ErrorModal from 'components/ErrorModal';
import { AircraftButtons } from '@shared/ui-configuration/aircraft';
import { getVisibleButtons } from 'utils/getVisibleButtons';
import { getButtonWithCallback } from 'utils/getButtonWithCallback';

const AircraftCard: FC<Props> = ({ setError, refetchAircrafts, aircraft }) => {
  const translation = useTranslation();
  const [isDeleteModal, setDeleteModal] = useState(false);
  const t = (
    key: string,
    params?: { aircraftReg: string; aircraftType: string; money: string }
  ) => translation.t(`aircraftCard.${key}`, params ?? []);
  const { workspaceId } = useParams();
  const [menu, setMenu] = useState(false);
  const { mutate: sellAircraft, isLoading } = aircraftService.useSellAircraft();
  const isAircraftConditionEnabled = useFeature(
    FeatureFlags.AIRCRAFT_CONDITION
  ).on;
  const handleSellAircraft = () => {
    setError('');
    sellAircraft(
      {
        workspaceId: workspaceId!,
        aircraftId: aircraft.id,
      },
      {
        onSuccess: () => {
          refetchAircrafts();
        },
        onError: (err: any) => {
          setError(getAPIError(err, t));
        },
      }
    );
  };

  const sellCost = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(aircraft.sellCost!);

  const CTACallbacks: { [x in AircraftButtons]?: () => void } = {
    [AircraftButtons.canSellAircraft]: () => {
      setDeleteModal(true);
    },
  };

  const dropdownDownMenu = () => {
    const visibleButtons = getVisibleButtons(aircraft.uiConfiguration!);

    return (
      visibleButtons
        ?.map((button) => {
          const isCallback = getButtonWithCallback(CTACallbacks, button);
          if (isCallback) {
            return { text: t(`menu.${button.key}`), onClick: isCallback };
          }

          return null;
        })
        .filter((option) => option !== null) ?? []
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={aircraft.image} />
      </div>
      <div onClick={() => setMenu(!menu)} className={styles.overflowMenu}>
        {!!dropdownDownMenu().length && (
          <DropdownMenuV2 options={dropdownDownMenu()} />
        )}
      </div>
      <div className={styles.description}>
        <Title className={styles.name} black>
          {`${aircraft.type.name}`}
        </Title>
      </div>

      <div className={styles.context}>
        <div className={styles.info}>Reg. {aircraft.registration}</div>
        <div className={styles.info}>{aircraft.miles} miles</div>
        {/* <div className={styles.info}>last flight: EPWA -&gt; EPWR</div> */}
      </div>
      {isAircraftConditionEnabled && (
        <div className={styles.barWrapper}>
          <Title className={styles.barTitle} black>
            Conditon:
          </Title>
          <AircraftStatusBar percent={aircraft.condition} />
        </div>
      )}
      <ErrorModal
        isOpen={isDeleteModal}
        toggle={setDeleteModal}
        title={t('sellModal.title')}
        text={t('sellModal.text', {
          aircraftReg: aircraft.registration,
          aircraftType: aircraft.type.type,
          money: sellCost,
        })}
        acceptText="Sell"
        cancelText="Cancel"
        isLoading={isLoading}
        isDisabled={isLoading}
        onAccept={() => handleSellAircraft()}
        onCancel={() => setDeleteModal(false)}
      />
    </div>
  );
};

export default AircraftCard;
