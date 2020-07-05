import express from 'express';
import userRoutes from './api/user/auth';
import BusRoutes from './api/route/route';
import Util from '../helpers/util';

const util = new Util();
const route = express.Router()

route.use('/',userRoutes)

route.use('/',BusRoutes)

route.use((req, res) =>
  res.status(404).json({
    status: 404,
    error: ' PAGE NOT FOUND ',
  })
);

export default route;

