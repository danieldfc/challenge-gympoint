import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

import validationUserStore from './app/validators/User/Store';
import validationSessionStore from './app/validators/Session/Store';
import validationStudentStore from './app/validators/Student/Store';
import validationStudentUpdate from './app/validators/Student/Update';
import validationPlanStore from './app/validators/Plan/Store';
import validationPlanUpdate from './app/validators/Plan/Update';
import validationEnrollmentStore from './app/validators/Enrollment/Store';
import validationEnrollmentUpdate from './app/validators/Enrollment/Update';

const routes = Router();

// User and Session
routes.post('/users', validationUserStore, UserController.store);
routes.post('/sessions', validationSessionStore, SessionController.store);

// Middleware for authenticate
routes.use(authMiddleware);

// Student
routes.get('/students', StudentController.index);
routes.post('/students', validationStudentStore, StudentController.store);
routes.put(
  '/students/:student_id',
  validationStudentUpdate,
  StudentController.update
);
routes.delete('/students/:student_id', StudentController.delete);

// Checkin
routes.get('/students/:student_id/checkins', CheckinController.index);
routes.post('/students/:student_id/checkins', CheckinController.store);

// HelpOrder
routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

// Answer
routes.post('/help-orders/:help_order_id/answer', AnswerController.store);

// Plan
routes.get('/plans', PlanController.index);
routes.post('/plans', validationPlanStore, PlanController.store);
routes.put('/plans/:id', validationPlanUpdate, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// Enrollment
routes.get('/enrollment', EnrollmentController.index);
routes.get('/enrollment/:id', EnrollmentController.show);
routes.post(
  '/enrollment/:student_id/student',
  validationEnrollmentStore,
  EnrollmentController.store
);
routes.put(
  '/enrollment/:student_id/student',
  validationEnrollmentUpdate,
  EnrollmentController.update
);
routes.delete('/enrollment/:id', EnrollmentController.delete);

export default routes;
