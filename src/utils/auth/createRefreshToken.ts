import { sign } from 'jsonwebtoken';
import { sessionRepository } from '../../admin/modules/Session/repository/sessionRepository';
import moment from 'moment';
interface CreateRefreshTokenPayload {
  userId: string;
  email: string;
}
export const createRefreshToken = async (
  payload: CreateRefreshTokenPayload
): Promise<String | null> => {
  try {
    const { userId } = payload;
    const newRefreshToken = sign(payload, process.env.REFRESHTOKENSECRET, {
      expiresIn: '7d',
    });
    await sessionRepository.update({
      userId,
      refreshToken: newRefreshToken,
      updatedAt: moment().valueOf(),
    });
    return newRefreshToken;
  } catch {
    return null;
  }
};
