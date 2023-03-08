import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { LatLngExpression } from 'leaflet';
import { Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RoutePath: FC<Props> = ({ origin, destination, route, color }) => {
  const options = { color: color ?? styles.pathColor };
  const routePath: LatLngExpression[] = route.map((route) => [
    Number(route.pos_lat),
    Number(route.pos_lng),
  ]);

  if (origin) {
    routePath.unshift([origin.lat, origin.lng]);
  }
  if (destination) {
    routePath.push([destination.lat, destination.lng]);
  }

  return <Polyline pathOptions={options} positions={routePath} />;
};

export default RoutePath;
