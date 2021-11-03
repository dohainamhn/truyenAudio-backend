import dotenv from 'dotenv'
import express from 'express';
import Mongodb from './utils/db'
dotenv.config()
const main = async () => {
  const app = express();
  const port = 3000;
  const db = new Mongodb()
  await db.connect()
  app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
  });
  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
}
main()