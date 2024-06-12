import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: 'user' | 'admin' },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
