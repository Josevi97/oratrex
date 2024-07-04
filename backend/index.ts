import "reflect-metadata";
import express from 'express';

import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import bodyParser from 'body-parser';

import { SERVER_PORT } from './config';
import router from './router';
import database from "./database";

// const csrfProtection = csrf({ cookie: true });
const app = express();

database.authenticate()
  .then(() => console.log('Database connected successful.'))
  .catch((err) => console.error('Error connecting to database.', err))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api', csrfProtection, router);
app.use('/api', router);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});