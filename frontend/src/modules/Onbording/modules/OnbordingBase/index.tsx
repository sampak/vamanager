import OnbordingHeader from 'components/OnbordingHeader';
import styles from './styles.module.scss';
import 'leaflet/dist/leaflet.css';
import { FC, Props } from './typings';
import ReactDOMServer from 'react-dom/server';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoundedButton from 'components/RoundedButton';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MarkerOnMap from 'components/MarkerOnMap';
import L, { LatLngExpression } from 'leaflet';
import airportService from 'api/airportService';
import { useEffect, useMemo } from 'react';
import airlineService from 'api/airlineService';

const blobToBase64 = async (url) => {
  return new Promise(async (resolve, _) => {
    let blob = await fetch(url).then((r) => r.blob());
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

const OnbordingBase: FC<Props> = ({
  image,
  selectedAirport,
  setSelectedAirport,
  details,
  steps,
  options,
}) => {
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string, params?: { airlineName?: string }) =>
    translation.t(`onbording.base.${key}`, params);

  const { mutate: createAirline } = airlineService.useCreateAirline();

  const { data: airportsData } = airportService.useGetAll();

  const airports = useMemo(() => airportsData?.data ?? [], [airportsData]);
  const handleNext = async () => {
    let base64Image: string | undefined = undefined;

    if (image) {
      base64Image = (await blobToBase64(image)) as string;
    }

    createAirline(
      {
        image: base64Image,
        name: details?.name!,
        icao: details?.icao!,
        description: details?.description!,
        joiningMethod: details?.joiningMethod!,
        base: selectedAirport,
        options: options,
      },
      {
        onSuccess: () => {},
      }
    );
  };

  const airportIcon = ReactDOMServer.renderToString(
    <FontAwesomeIcon icon={faPlaneDeparture} />
  );

  const airportMarker = new L.DivIcon({
    html: airportIcon,
    className: styles.icon,
  });

  const activeAirportMarker = new L.DivIcon({
    html: airportIcon,
    className: styles.activeIcon,
  });

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <OnbordingHeader
          title={t('title', { airlineName: details?.name })}
          subTitle={t('subTitle')}
          steps={steps}
          activeStep={2}
        />
      </div>

      <div className={styles.mapContainer}>
        <MapContainer center={[51, 16]} zoom={5} className={styles.map}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {airports.map((airport) => {
            return (
              <MarkerOnMap
                value={airport.id}
                onClick={(id) => setSelectedAirport(id)}
                tooltip={`${airport.name} (${airport.icao})`}
                key={airport.icao}
                icon={
                  selectedAirport === airport.id
                    ? activeAirportMarker
                    : airportMarker
                }
                position={[airport.lat, airport.lng]}
              />
            );
          })}
        </MapContainer>
      </div>

      <div className={styles.buttonWrapper}>
        <RoundedButton
          outline
          onClick={() => navigate('/onbording/configuration')}
          className={`${styles.button} ${styles.black}`}
        >
          Back
        </RoundedButton>
        <RoundedButton
          disabled={!selectedAirport.length}
          onClick={handleNext}
          className={styles.button}
        >
          Next
        </RoundedButton>
      </div>
    </div>
  );
};

export default OnbordingBase;
