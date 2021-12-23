import _ from 'lodash';
import path from 'path';
import { getDirectories } from '../getDirectories';
import { Enpoint } from './getAllTypeDefs';

export const getAllResolvers = async (endPoint) => {
  if (endPoint === Enpoint.admin) {
    const allDiretories = await getDirectories('./src/admin/modules');
    const allResolvers = await getResolver(allDiretories, 0, endPoint);
    return _.merge({}, allResolvers);
  } else {
    const allDiretories = await getDirectories('./src/guest/modules');
    const allResolvers = await getResolver(allDiretories, 0, endPoint);
    return _.merge({}, allResolvers);
  }
};

const getResolver = async (
  allDiretories: string[],
  currentIndex: number,
  endpoint: Enpoint,
  currentResolver = {}
) => {
  const directory = path.resolve(
    `./src/${endpoint}/modules/${allDiretories[currentIndex]}/resolvers.ts`
  );
  const { resolvers } = await import(directory);
  currentResolver = _.merge(currentResolver, resolvers);
  const newIndex = currentIndex + 1;
  if (allDiretories[newIndex]) {
    await getResolver(allDiretories, newIndex, endpoint, currentResolver);
  } else {
    return currentResolver;
  }
};
