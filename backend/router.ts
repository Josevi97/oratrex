import express from 'express';
import usersController from './src/features/users/api/users.controller';
import csvMiddleware from './src/middlewares/csv.middleware';

const router = express.Router();

// session

// users
router.get('/users', usersController.getAll);
router.post('/users/bulk', csvMiddleware.user, usersController.bulkCreate);

export default router;
