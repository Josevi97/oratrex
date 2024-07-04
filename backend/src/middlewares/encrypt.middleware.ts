import { NextFunction } from "express";
import { CustomRequest } from "../types/requests";

import bcrypt from 'bcrypt';

// DEPRECATED: I think it is much better to handle this in the service layer
// const encryptMiddleware = (property: string) => {
//   return async (req: CustomRequest<any>, _: any, next: NextFunction) => {
//     const fileContent = await Promise.all(
//       (req.fileContent || [])
//         .map(async content => {
//           if (!(property in content)) return null;

//           return {
//             ...content,
//             [property]: await bcrypt.hash(content[property], 10),
//           };
//         })
//       .filter(content => content)
//     );

//     console.log('Encryption successfully finished');
//     req.fileContent = fileContent;

//     next();
//   }
// }

// const password = () => encryptMiddleware('password');

// export default {
//   password: password(),
// };
