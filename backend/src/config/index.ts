export const config = {
  saltRounds: process.env.SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET ?? 'xxxx',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '3d',
  },
};
