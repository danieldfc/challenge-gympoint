import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

import validationUserStore from './app/validators/UserStore';
import validationSessionStore from './app/validators/SessionStore';
import validationStudentStore from './app/validators/StudentStore';

const routes = Router();

routes.post('/users', validationUserStore, UserController.store);

routes.post('/sessions', validationSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/students', validationStudentStore, StudentController.store);

export default routes;
