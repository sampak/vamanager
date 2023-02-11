import { FC, Props } from './typing';
import styles from './styles.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from 'components/Input';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from 'use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import aircraftService from 'api/aircraftService';
import Aircraft from '@shared/base/Aircraft';
import airlineService from 'api/airlineService';
import AircraftStatusBar from 'components/AircraftStatusBar';
import { useFeature } from '@growthbook/growthbook-react';
import { FeatureFlags } from '@shared/base/FeatureFlags';

const SelectAircraft: FC<Props> = ({
  aircraftType,
  label,
  placeholder,
  onChange,
}) => {
  const { workspaceId } = useParams();
  const ref = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search] = useDebounce(searchInput, 300);

  const isAircraftConditionEnabled = useFeature(
    FeatureFlags.AIRCRAFT_CONDITION
  ).on;

  const {
    data: aircraftsData,
    refetch: searchAircrafts,
    isLoading,
  } = airlineService.useSearchAircrafts(
    workspaceId!,
    {
      type: aircraftType,
      search: search,
    },
    false
  );

  const aircrafts = useMemo(() => aircraftsData?.data ?? [], [aircraftsData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }

      if (ref.current && ref.current.contains(event.target)) {
        setActive(true);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    searchAircrafts();
  }, [search]);

  const handleChoose = (aircraft) => {
    setInputText(`${aircraft?.type?.name} (${aircraft.registration})`);
    setActive(false);
    onChange(aircraft);
  };

  return (
    <div ref={ref} className={styles.wrapper}>
      <Input
        autoComplete="off"
        icon={faSearch}
        name="aircraft"
        type="text"
        label={label && label}
        placeholder={placeholder && placeholder}
        onChange={(e) => {
          setInputText(e.target.value);
          setSearchInput(e.target.value);
        }}
        value={inputText}
      />
      {active && (!!aircrafts.length || isLoading) && (
        <div className={styles.options}>
          {isLoading ? (
            <div className={styles.loading}>
              <FontAwesomeIcon icon={faSpinner} />
            </div>
          ) : (
            <>
              {aircrafts.map((aircraft: Aircraft) => (
                <div
                  key={aircraft.id}
                  onClick={() => handleChoose(aircraft)}
                  className={styles.option}
                >
                  <div className={styles.name}>
                    {aircraft?.type?.name} ({aircraft.registration})
                  </div>
                  {isAircraftConditionEnabled && (
                    <div className={styles.condition}>
                      <AircraftStatusBar percent={aircraft.condition} />
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectAircraft;
