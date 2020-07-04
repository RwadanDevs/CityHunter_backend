import express from 'express';
import userRoutes from './api/user/auth';
import Util from '../helpers/util';

const util = new Util();
const route = express.Router()

route.get('/',(req,res)=>{
    const message = "Welcome To City |- Hunter";
    util.setSuccess(200, message);
    return util.send(res);
})

route.use('/api/v1',userRoutes)

route.use((req, res) =>
  res.status(404).json({
    status: 404,
    error: ' PAGE NOT FOUND ',
  })
);

export default route;

