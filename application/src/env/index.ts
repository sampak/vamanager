import envProd from './env.prod';
import envDev from './env.dev';

let env: any = {};

if (process.env.NODE_ENV === 'production') {
  env = envProd;
} else {
  env = envDev;
}

export default env;
