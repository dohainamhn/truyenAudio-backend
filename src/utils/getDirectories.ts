import fs from 'fs';
import path from 'path';
export const getDirectories = async (value) => {
  const directory = path.resolve(value);
  return fs.readdirSync(directory).filter(function (file) {
    return fs.statSync(directory + '/' + file).isDirectory();
  });
};
