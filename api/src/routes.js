import { Router } from 'express';

import UserController from './app/controllers/UserController';

import validationUserStore from './app/validators/UserStore';

const routes = Router();

routes.post('/users', validationUserStore, UserController.store);

export default routes;
