import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import validationUserStore from './app/validators/UserStore';
import validationSessionStore from './app/validators/SessionStore';

const routes = Router();

routes.post('/users', validationUserStore, UserController.store);

routes.post('/sessions', validationSessionStore, SessionController.store);

export default routes;
