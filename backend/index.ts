import "reflect-metadata";
import express from 'express';

import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import bodyParser from 'body-parser';
import cors from 'cors';

import { SERVER_PORT } from './src/config';
import router from './router';
import database from "./src/database";

const csrfProtection = csrf({ cookie: true });
export const app = express();

database.authenticate()
  .then(() => console.log('Database connected successful.'))
  .catch((err) => console.error('Error connecting to database.', err))

app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(csrfProtection);
app.use('/api', router);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});
