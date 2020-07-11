import express from 'express';
import userRoutes from './api/user/auth';
import travelRoutes from './api/route/route';
import busses from './api/bus/bus';
import Util from '../helpers/util';

const util = new Util();
const route = express.Router()

route.use('/',userRoutes)

route.use('/',travelRoutes)

route.use('/',busses)

export default route;
