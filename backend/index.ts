import express from 'express';
import { SERVER_PORT } from './config';

const app = express();

const onStart = () => {
  console.log(`Server started on port ${SERVER_PORT}`);
}

app.listen(SERVER_PORT, onStart);
