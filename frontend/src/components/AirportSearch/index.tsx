import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Input from 'components/Input';
import { useState, useEffect, useMemo, useRef, RefObject } from 'react';
import airportService from 'api/airportService';
import Airport from '@shared/base/Airport';
import { useDebounce } from 'use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from 'react-i18next';

const AirportSearch: FC<Props> = ({ label, placeholder, onChange }) => {
  const ref = useRef<HTMLInputElement>(null);
  const translation = useTranslation();
  const t = (key: string) => translation.t(`airportSearch.${key}`);
  const [active, setActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search] = useDebounce(searchInput, 300);

  const {
    data: airportsData,
    refetch: searchAirports,
    isLoading,
  } = airportService.useGetSearch(inputText, false);

  const airports = useMemo(() => airportsData?.data ?? [], [airportsData]);

  const handleChoose = (airport) => {
    setInputText(`${airport.icao} - ${airport.name}`);
    onChange(airport);
  };

  useEffect(() => {
    if (search.length > 2) {
      searchAirports();
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
        name="airport"
        type="text"
        label={label ? label : t('label')}
        placeholder={placeholder ? placeholder : t('placeholder')}
        onChange={(e) => {
          setInputText(e.target.value);
          setSearchInput(e.target.value);
        }}
        value={inputText}
      />
      {active && (!!airports.length || isLoading) && (
        <div className={styles.options}>
          {isLoading ? (
            <div className={styles.loading}>
              <FontAwesomeIcon icon={faSpinner} />
            </div>
          ) : (
            <>
              {airports.map((airport: Airport) => (
                <div
                  key={airport.id}
                  onClick={() => handleChoose(airport)}
                  className={styles.option}
                >
                  {airport.icao} - {airport.name}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AirportSearch;
