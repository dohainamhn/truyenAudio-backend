import { Response, NextFunction, CookieOptions } from 'express';
import { verify } from 'jsonwebtoken';
import { overrideConfigs } from '../../common/config';
import { ExpressRequest } from '../../inferfaces';
import { createAccessToken } from './createAccessTokens';

export const verifyTokens = (
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies['access-token'];
  const refreshToken = req.cookies['refresh-token'];

  if (!accessToken && !refreshToken) {
    return next();
  }

  try {
    const data = verify(accessToken, process.env.ACCESSTOKENSECRET) as any;
    req.userId = data.userId;
    return next();
  } catch {}

  try {
    const data = verify(refreshToken, process.env.REFRESHTOKENSECRET) as any;
    const accessToken = createAccessToken({ userId: data.userId });

    req.userId = data.userId;

    res.cookie(
      'access-token',
      accessToken,
      overrideConfigs.responseCookieOption as CookieOptions
    );
  } catch {}
  next();
};
