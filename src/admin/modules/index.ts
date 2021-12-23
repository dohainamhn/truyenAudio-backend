import _ from 'lodash';
import { authTypeDefs } from './auth/graphQL/typeDefs';
import { authResolvers } from './auth/graphQL/resolvers';
import { commonTypeDefs } from '../../types';

export const adminTypeDefs = [...commonTypeDefs,authTypeDefs];
export const adminResolvers = _.merge({}, authResolvers);
