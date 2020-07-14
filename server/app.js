import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import Util from './helpers/util';
import routes from './routes/routes';
import { io } from './helpers/sockets';

const util = new Util();
const app = express();

app.use(express.static(path.join(__dirname,'../public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('dev'));

app.use((req,res,next)=>{
  req.socket = io;
  next();
});

app.get('/',(req,res)=>{
    const message = "Welcome To City |- Hunter";
    util.setSuccess(200, message);
    return util.send(res);
})

app.use('/api/v1',routes)

app.use((req, res) =>
  res.status(404).json({
    status: 404,
    error: ' PAGE NOT FOUND ',
  })
);

export default app;
