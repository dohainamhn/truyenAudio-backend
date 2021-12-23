import { sign } from 'jsonwebtoken';
import { User } from '../../admin/modules/auth/interface/User';

interface CreateAccessTokenPayload  {
  userId: string,
}

export const createAccessToken = (user: CreateAccessTokenPayload) => {
  const accessToken = sign(
    {
      userId: user.userId,
    },
    process.env.ACCESSTOKENSECRET,
    {
      expiresIn: '15s',
    }
  );
  return accessToken;
};
