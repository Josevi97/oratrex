import express from 'express';
import usersController from './src/features/users/api/users.controller';
import csvMiddleware from './src/middlewares/csv.middleware';
import validateContentType from './src/validators/fileContent.validator';
import authController from './src/features/authentication/api/auth.controller';
import authValidator from './src/features/authentication/validators/auth.validator';
import authMiddleware from './src/features/authentication/middlewares/auth.middleware';
import sanitizeMiddleware from './src/middlewares/sanitize.middleware';

const router = express.Router();

// csrf
router.get('/csrf', (req, res) => {
  // const date = new Date();
  // date.setDate(date.getDate() + 15);

  // res.status(200).json({ data: { csrfToken: req.csrfToken(), expiresAt: date } });
  res.end();
});

// session
router.post('/auth', authValidator, sanitizeMiddleware('body'), authController.login);
router.get('/auth/session', authMiddleware, authController.session);

// users
router.get('/users', authMiddleware, usersController.getAll);
router.post('/users/bulk', validateContentType, csvMiddleware.user, sanitizeMiddleware('fileContent'), usersController.bulkCreate);
router.delete('/users', usersController.deleteAll);

export default router;
