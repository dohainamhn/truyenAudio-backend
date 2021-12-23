import _ from 'lodash';
import { testResolvers } from './test/resolvers';
import { testTypeDefs } from './test/typedef';

export const guestTypeDefs = [testTypeDefs];
export const guestResolvers = _.merge({}, testResolvers);
