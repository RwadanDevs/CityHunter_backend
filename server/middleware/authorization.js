import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Util from '../helpers/util';
import userService from '../services/userService';

dotenv.config();

const util = new Util();

export const authorizationCheck = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const viewToken = await userService.findByEmail({ email: decoded.email });

      req.userData = viewToken.dataValues;
      next();
    } catch (error) {
      const Error = 'No token provided or Token expired';
      util.setError(401, Error);
      return util.send(res);
    }
  };

export const VerifyToken = async (req,res,next) => {
  try{
    const { token } = req.params;

    const getInfo = jwt.verify(token, process.env.JWT_KEY);

    const userRecord = await userService.findByEmail({ email : getInfo.email });

    req.body = {...userRecord.dataValues};
    return next()
  } catch (error) {
    const Error = 'No token provided or Token expired';
    util.setError(401, Error);
    return util.send(res);
  }
}
