import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import StartEndController from './app/controllers/StartEndDeliveryController';
import FileController from './app/controllers/FileController';
import authMiddleware from './middlewares/auth';
import multerConfig from './config/multer';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const upload = multer(multerConfig);
const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'FastFEET API' }));
routes.post('/session', SessionController.store);
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

// routes.post('/recipient', RecipientController.index);
routes.post('/recipient', RecipientController.store);
// routes.post('/recipient', RecipientController.update);
// routes.post('/recipient', RecipientController.delete);

routes.get('/delivery-man', DeliveryManController.index);
routes.post('/delivery-man', DeliveryManController.store);
routes.put('/delivery-man', DeliveryManController.update);
routes.delete('/delivery-man/:id', DeliveryManController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);
routes.get(
    '/deliveryman/:id/deliveries',
    DeliveryController.indexByDeliveryMan
);

routes.post('/deliveries/start', StartEndController.start);
routes.post('/deliveries/end', StartEndController.end);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/delivery/problems', DeliveryProblemController.store);
routes.get('/delivery/problems', DeliveryProblemController.index);

export default routes;
