// Resolvers define the technique for fetching the types defined in the

import { userRepository } from '../repository/userRepository';
import { cryptoHash, cryptoVerify } from '../../../../utils/crypto';
import { UserInputError } from 'apollo-server-errors';
import * as yup from 'yup';
import { sign } from 'jsonwebtoken';
import { createRefreshToken } from '../../../../utils/auth/createRefreshToken';
import { CreateUserPayload } from '../interface';
import { overrideConfigs } from '../../../../common/config';
import { createAccessToken } from '../../../../utils/auth/createAccessTokens';
// schema. This resolver retrieves books from the "books" array above.

export const authResolvers = {
  Query: {
    me: async (_, __, { req }) => {
      if (!req.userId) {
        throw new UserInputError('user not found');
      }

      return await userRepository.findOne({
        _id: req.userId,
      });
    },
  },
  Mutation: {
    signUp: async (parent, data, context) => {
      const { password } = data;
      const hashPasword = await cryptoHash(password);
      const yupSchema = yup.object().shape({
        userName: yup.string().required('userName is required'),
        email: yup.string().email('Email errors').required('Email is required'),
        password: yup
          .string()
          .oneOf([yup.ref('password'), null])
          .min(8, 'Password must be more than 6 charactor'),
        adminKey: yup
          .string()
          .required('adminKey is required')
          .oneOf([process.env.ADMINTOKEN], 'Admin Token is not correct'),
      });
      await yupSchema.validate(data);
      await userRepository.create({
        ...data,
        role: 'ADMIN',
        password: hashPasword,
      });
      return {
        data: {
          message: 'Sign up successfully',
        },
      };
    },
    signIn: async (_, data: CreateUserPayload, context) => {
      const { email, password } = data;
      const { res } = context;
      // validate
      const yupSchema = yup.object().shape({
        email: yup.string().required('email is required').email(),
        password: yup
          .string()
          .required('password is required')
          .min(8, 'Password must be more than 6 charactor'),
      });

      await yupSchema.validate(data);

      const user = await userRepository.findOne({ email });
      if (!user) {
        throw new UserInputError(`User with email ${email} not found`);
      }

      const correctPassword = await cryptoVerify(password, user.password);
      if (!correctPassword) {
        throw new UserInputError(`Email or Password is not correct`);
      }
      // create token
      const refreshToken = await createRefreshToken({
        userId: user._id,
        email: user.email,
      });
      const accessToken = createAccessToken({
        userId: user._id,
      });
      // response token
      res.cookie(
        'refresh-token',
        refreshToken,
        overrideConfigs.responseCookieOption
      );
      res.cookie(
        'access-token',
        accessToken,
        overrideConfigs.responseCookieOption
      );
      return user;
    },
  },
};
