import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Input from 'components/Input';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from 'react-i18next';
import aircraftService from 'api/aircraftService';
import { useParams } from 'react-router-dom';
import TypeOfAircraft from '@shared/base/TypeOfAircraft';

const CompanyAircraftTypesSearch: FC<Props> = ({
  label,
  placeholder,
  onChange,
}) => {
  const { workspaceId } = useParams();
  const ref = useRef<HTMLInputElement>(null);
  const translation = useTranslation();
  const t = (key: string) => translation.t(`aircraftSearch.${key}`);
  const [active, setActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search] = useDebounce(searchInput, 300);

  const {
    data: aircraftsData,
    refetch: searchAircrafts,
    isLoading,
  } = aircraftService.useSearchCompanyTypeOfAircraft(
    workspaceId!,
    inputText,
    false
  );

  const aircrafts = useMemo(() => aircraftsData?.data ?? [], [aircraftsData]);

  const handleChoose = (aircraft) => {
    setInputText(`${aircraft.type} - ${aircraft.name}`);
    onChange(aircraft);
  };

  useEffect(() => {
    if (search.length > 2) {
      searchAircrafts();
    }
  }, [search]);

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

  return (
    <div ref={ref} className={styles.wrapper}>
      <Input
        autoComplete="off"
        icon={faSearch}
        name="aircraft"
        type="text"
        label={label ? label : t('label')}
        placeholder={placeholder ? placeholder : t('placeholder')}
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
              {aircrafts.map((aircraft: TypeOfAircraft) => (
                <div
                  key={aircraft.id}
                  onClick={() => handleChoose(aircraft)}
                  className={styles.option}
                >
                  {aircraft.type} - {aircraft.name}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyAircraftTypesSearch;
