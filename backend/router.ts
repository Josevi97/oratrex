import express from 'express';
import usersController from './src/features/users/api/users.controller';

const router = express.Router();

// users
router.post('/users/bulk', usersController.bulk);

// auth

export default router;
