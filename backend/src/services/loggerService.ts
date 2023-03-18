import { config } from 'src/config';

const pino = require('pino');

const transport = pino.transport({
  target: '@logtail/pino',
  options: { sourceToken: config.PINO_SOURCE },
});

const logger = pino(transport);

const warn = (msg: Object | string) => {
  if (process.env.NODE_ENV === 'production') {
    logger.warn({
      message: msg,
    });
  }
  if (typeof msg === 'object') {
    msg = JSON.stringify(msg);
  }

  console.log(`[WARN] ${msg}`);
};

const error = (msg: Object | string) => {
  if (process.env.NODE_ENV === 'production') {
    logger.error({ message: msg });
  }
  if (typeof msg === 'object') {
    msg = JSON.stringify(msg);
  }

  console.log(`[ERROR] ${msg}`);
};

const info = (msg: Object | string) => {
  if (process.env.NODE_ENV === 'production') {
    logger.info({ message: msg });
  }

  if (typeof msg === 'object') {
    msg = JSON.stringify(msg);
  }

  console.log(`[INFO] ${msg}`);
};

export default {
  warn,
  error,
  info,
};
