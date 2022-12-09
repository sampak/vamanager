import { config } from 'src/config';
import * as jwt from 'jsonwebtoken';

const genToken = async (object: any): Promise<string> => {
  const token = await jwt.sign(object, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  return token;
};

export default {
  genToken,
};
