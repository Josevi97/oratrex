import { UserDto } from './../features/users/types/user.dto';
import { Request } from 'express';
import { CsvData } from './csv';

interface CustomRequest<T> extends Request {
  fileContent?: T[];
}

interface SessionRequest extends Request {
  session?: UserDto
}
