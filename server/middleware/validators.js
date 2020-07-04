import dotenv from 'dotenv';
import Util from '../helpers/util';
import userService from '../services/userService';
import { roleUpdateValidateSchema } from '../helpers/validationSchema';

const util = new Util();

dotenv.config();

export default class validators {
    static async verifyId(req, res, next) {
        // Get model identifier from request parameters
        const { userId } = req.params;

        // check database for existence
        const exists = await userService.findById(userId);

        if (!exists) {
        util.setError(404, `User with id ${userId} does not exist`);
        return util.send(res);
        }

        return next();
    }

    static async RoleUpdateValidator(req, res, next) {
      const { role } = req.body; 
       const { error } = roleUpdateValidateSchema.validate({ role });
    
        if ( error ) {
          const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
          util.setError(400, Error);
          return util.send(res);
        }
        if( 
          role !=="Manager" &&
          role !== "Super Administrator"
          && role !=="requester"
         ){
          const Error = {
            error: 'Unkown Role Type',
            tip: `Try Requester,Maneger or Super Amdministrator`,
          };
          util.setError(400, Error);
          return util.send(res);
         }
        return next();
    }
}