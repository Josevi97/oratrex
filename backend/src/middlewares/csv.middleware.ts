import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { CustomRequest } from "../types/requests";
import { UserFields } from "../features/users/constants/user.fields";
import { UserDto } from "../features/users/types/user.dto";
import { header } from "express-validator";

type Header = { [key: string]: string };

const upload = multer({ storage: multer.memoryStorage()});

const processCsv = (headers: Header, processed: string) => {
  const content = processed.split('\r');

  if (content.length <= 0) return [];

  const header = content[0].split(';');
  const body = content.slice(1).map(data => data.split(';'));

  return body.map(data => {
    const d = data.map((d: string, i: number) => [headers[header[i].toLowerCase().trim()], d]);
    return Object.fromEntries(d);
  });
}

const csvMiddleware = <T>(headers: Header) => {
  return (req: CustomRequest<T>, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, (error)  => {
      if (error) {
        console.error('Error getting file', error);
        return res.status(400).json({ error: error.message });
      }

      if (!req.file) {
        console.error('File not provided');
        return res.status(400).json({ error: 'File not provided'});
      }

      const processed = req.file.buffer.toString('utf-8');
      const fileContent = processCsv(headers, processed);

      if (!fileContent.length) {
        console.warn('Empty file provided', error);
        res.status(201);
      }

      console.log('Csv loaded successfully');
      req.fileContent = fileContent;

      next();
    });
  }
}

const user = () => {
  const headers: Header = {
    'nombre': UserFields.name,
    'dirección': UserFields.address,
    'usuario': UserFields.username,
    'contraseña': UserFields.password,
    'código': UserFields.code,
  }

  return csvMiddleware<UserDto>(headers);
}

export default {
  user: user(),
}

export {
  processCsv
}
