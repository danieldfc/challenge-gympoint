import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanManagementController from './app/controllers/PlanManagementController';

import authMiddleware from './app/middlewares/auth';

import validationUserStore from './app/validators/UserStore';
import validationSessionStore from './app/validators/SessionStore';
import validationStudentStore from './app/validators/StudentStore';
import validationStudentUpdate from './app/validators/StudentUpdate';

const routes = Router();

routes.post('/users', validationUserStore, UserController.store);

routes.post('/sessions', validationSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/students', validationStudentStore, StudentController.store);
routes.put(
  '/students/:student_id',
  validationStudentUpdate,
  StudentController.update
);

routes.get('/plans', PlanManagementController.index);
routes.post('/plans', PlanManagementController.store);
routes.update('/plans/:id', PlanManagementController.update);
routes.delete('/plans/:id', PlanManagementController.delete);

export default routes;
