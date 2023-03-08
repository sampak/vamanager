import { FC, Props } from './typings';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from './styles.module.scss';
import classNames from 'classnames';
import 'leaflet/dist/leaflet.css';

const Map: FC<Props> = ({
  zoom = 6,
  center = [51, 16],
  children,
  className,
  mapRef,
}) => {
  useEffect(() => {
    mapRef?.current?.setZoom(zoom);
  }, [zoom, mapRef]);

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={zoom}
      className={classNames(styles.map, className)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
