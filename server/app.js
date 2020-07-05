import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import Util from './helpers/util';
import routes from './routes/routes';

const util = new Util();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    const message = "Welcome To City |- Hunter";
    util.setSuccess(200, message);
    return util.send(res);
})

app.use('/api/v1',routes)

export default app;
