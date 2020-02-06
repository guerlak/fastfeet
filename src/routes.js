import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'FastFEET API' }));

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientsController.store);

export default routes;
