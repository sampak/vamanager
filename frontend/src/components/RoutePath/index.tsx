import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { LatLngExpression } from 'leaflet';
import { Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RoutePath: FC<Props> = ({
  origin,
  destination,
  route,
  color,
  tracker,
}) => {
  const options = { color: color ?? styles.pathColor };

  let routePath: LatLngExpression[] = [];

  if (route) {
    routePath = route.map((route) => [
      Number(route.pos_lat),
      Number(route.pos_lng),
    ]);
  }

  if (tracker) {
    routePath = tracker.map((route) => [Number(route.lat), Number(route.lng)]);
  }

  if (origin) {
    routePath.unshift([origin.lat, origin.lng]);
  }
  if (destination) {
    routePath.push([destination.lat, destination.lng]);
  }

  return <Polyline pathOptions={options} positions={routePath} />;
};

export default RoutePath;
