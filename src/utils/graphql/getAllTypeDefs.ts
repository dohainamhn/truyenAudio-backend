import _ from 'lodash';
import path from 'path';
import { getDirectories } from '../getDirectories';

const getTypeDef = async (
  allDiretories: string[],
  currentIndex: number,
  endPoint: Enpoint,
  typeDefs = []
) => {
  const directory = path.resolve(
    `./src/${endPoint}/modules/${allDiretories[currentIndex]}/typedef.ts`
  );
  const { default: type } = await import(directory);
  console.log(type);
  // typeDefs.push(type);
  const newIndex = currentIndex + 1;
  if (allDiretories[newIndex]) {
    await getTypeDef(allDiretories, newIndex, endPoint, typeDefs);
  } else {
    return typeDefs;
  }
};

export enum Enpoint {
  admin = 'admin',
  guest = 'guest',
}

export const getAllTypeDefs = async (endPoint: Enpoint) => {
  if (endPoint === Enpoint.admin) {
    const allDiretories = await getDirectories('./src/admin/modules');
    return await getTypeDef(allDiretories, 0, endPoint);
  } else {
    const allDiretories = await getDirectories('./src/guest/modules');
    return await getTypeDef(allDiretories, 0, endPoint);
  }
};
