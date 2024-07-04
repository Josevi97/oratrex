import { Request } from 'express';
import { CsvData } from './csv';

interface CustomRequest<T> extends Request {
  fileContent?: T[];
}
