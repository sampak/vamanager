export const config = {
  // develop: process.env.DEVELOP ?? false,
  develop: false,
  email: {
    from: 'noreply VAManager',
  },
  saltRounds: process.env.SALT_ROUNDS ?? 10,
  simbriefApiKey: process.env.SIMBRIEF_API_KEY,
  simbriefOutputPage: 'http://localhost:3000',
  jwt: {
    secret: process.env.JWT_SECRET ?? 'xxxx',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '3d',
  },

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? 'AWS_ACCESS_KEY_ID',
  AWS_SECRET_ACCESS_KEY:
    process.env.AWS_SECRET_ACCESS_KEY ?? 'AWS_SECRET_ACCESS_KEY',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME ?? 'AWS_BUCKET_NAME',
};
