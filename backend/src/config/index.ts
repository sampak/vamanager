export const config = {
  saltRounds: process.env.SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET ?? 'xxxx',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '3d',
  },

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? 'AWS_ACCESS_KEY_ID',
  AWS_SECRET_ACCESS_KEY:
    process.env.AWS_SECRET_ACCESS_KEY ?? 'AWS_SECRET_ACCESS_KEY',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME ?? 'AWS_BUCKET_NAME',
};
