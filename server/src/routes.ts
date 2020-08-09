import express from 'express';

import ClassController from './controllers/ClassController';
import ConnectionController from './controllers/ConnectionController';

const routes = express.Router();

const ctrlClass      = new ClassController();
const ctrlConnection = new ConnectionController();

routes.get('/classes', ctrlClass.index);
routes.post('/classes', ctrlClass.store);

routes.get('/connections', ctrlConnection.index);
routes.post('/connections', ctrlConnection.store);

export default routes;