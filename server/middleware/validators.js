import dotenv from 'dotenv';
import Util from '../helpers/util';
import userService from '../services/userService';
import routeService from '../services/routeService';
import stopService from '../services/stopService';
import routeNumberService from '../services/rNumberService';
import { 
  roleUpdateValidateSchema, 
  routeValidateSchema,
  stopValidateSchema,
  BusValidateSchema,
  BusUpdateValidateSchema,
  GetBusValidateSchema,
  locationValidateSchema,
} from '../helpers/validationSchema';

const util = new Util();

dotenv.config();

const handler = (req,res,schema) => {
  const { error } = schema.validate(req.body);
   
       if ( error ) {
          if (
            error.details[0].message
              .replace('/', '')
              .replace(/"/g, '')
              .includes('fails to match the required')
          ) {
            const Error = {
              error: 'Incorrect use of special characters',
              tip: `Please avoid characters that looks like = or /`,
            };
            util.setError(400, Error);
            return util.send(res);
          }
  
         const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
         util.setError(400, Error);
         return util.send(res);
       }
       
}

const validate = async (req,res) => {
  
  const { routeNumbers } = req.body;

  if(routeNumbers[0])
  for(const routeNumber of routeNumbers){
    const exist = await routeService.findByRouteNumber(routeNumber)

    if(!exist){
        util.setError(404,`RouteNumber ${routeNumber} Not Found`)
        return util.send(res)
    }

    let counter = 0;

    for(let b = 0;b < routeNumbers.length;b++){
        if(routeNumbers[b] === routeNumber){
            counter = counter  + 1; 
        }
    }

    if(counter > 1){
        util.setError(400,'Remove Similar RouteNumbers')
        return util.send(res)
    }
  }
}

const plateValidator = async (req,res,plate) => {
  const arr = plate.split("")
  const newArr = [];
  let numberCounter = 0 ,vowelCounter = 0 ;

  for(const element of arr){
    if(element !== ' '){
      if(isNaN(element)){
        vowelCounter++;
        newArr.push(element.toUpperCase())
      }else{
        numberCounter++;
        newArr.push(element)
      }
    }
  }

  if(numberCounter !==3 || vowelCounter !== 4){
    util.setError(400,'Invalid Plate number')
    return util.send(res)
  }

  const plateNumber = newArr.join("");
  req.body = { ...req.body,plateNumber }
}

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
      const { role }  = req.body;
       handler(req,res,roleUpdateValidateSchema)
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

    static async RouteValidator(req, res, next) { 
      handler(req,res,routeValidateSchema)
        
      return next();
    }

    static async StopValidator(req, res, next) {
      handler(req,res,stopValidateSchema)

      validate(req,res)
        
      return next();
    }

    static async StopUpdateValidator(req,res,next){
      handler(req,res,stopValidateSchema)

      if(req.body){
        const { stop_id } = req.params;

        const exist = await stopService.findById(stop_id)

        if(!exist){
            util.setError(404,'Stop NotFound')
            return util.send(res)
        }
        

        await routeNumberService.deleteAtt({ stop_id })

        validate(req,res)
      }

      return next();
    }

    static async BusValidator(req, res, next) {
      handler(req,res,BusValidateSchema)
       
      if(req.body){
        const { plate } = req.body;
        if(plate)
        plateValidator(req ,res ,plate.trim())
      }

      return next();
    }

    static async BusUpdateValidator(req, res, next) {
      handler(req,res,BusUpdateValidateSchema)

      if(req.body){
        const { plate } = req.body;
        if(plate)
        plateValidator(req ,res ,plate.trim())
      }
      
      return next();
    }

    static async GetBusValidator(req,res,next){
      handler(req,res,GetBusValidateSchema)

      return next();
    }

    static async LocattionsValidations(req,res,next){
      handler(req,res,locationValidateSchema)

      return next();
    }

}
