import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryController from './app/controllers/DeliveryManController';
import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'FastFEET API' }));

routes.post('/session', SessionController.store);
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries', DeliveryController.update);
routes.delete('/deliveries', DeliveryController.delete);

export default routes;
