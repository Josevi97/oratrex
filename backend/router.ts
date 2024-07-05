import express from 'express';
import usersController from './src/features/users/api/users.controller';
import csvMiddleware from './src/middlewares/csv.middleware';
import validateContentType from './src/validators/fileContent.validator';
import authController from './src/features/authentication/api/auth.controller';
import authValidator from './src/features/authentication/validators/auth.validator';
import authMiddleware from './src/features/authentication/middlewares/auth.middleware';

const router = express.Router();

// session
router.post('/auth', authValidator, authController.login);
router.get('/auth/session', authMiddleware, authController.session);

// users
router.get('/users', authMiddleware, usersController.getAll);
router.post('/users/bulk', validateContentType, csvMiddleware.user, usersController.bulkCreate);
router.delete('/users', usersController.deleteAll);

export default router;
