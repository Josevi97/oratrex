import "reflect-metadata";
import express from 'express';

import { SERVER_PORT } from './config';
import router from './router';
import database from "./database";

const app = express();

database.initialize()
  .then(() => console.log('Database connected successful.'))
  .catch((err) => console.error('Error connecting to database.', err))

app.use('/api', router);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});
