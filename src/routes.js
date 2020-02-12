import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverController from './app/controllers/DeliverController';
import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'FastFEET API' }));

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/recipients', RecipientController.store);
routes.get('/deliveries', DeliverController.index);
routes.post('/deliveries', DeliverController.store);

export default routes;
