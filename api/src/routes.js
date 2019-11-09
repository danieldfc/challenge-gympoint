import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

import validationUserStore from './app/validators/User/Store';
import validationSessionStore from './app/validators/Session/Store';
import validationStudentStore from './app/validators/Student/Store';
import validationStudentUpdate from './app/validators/Student/Update';

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

routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

export default routes;
