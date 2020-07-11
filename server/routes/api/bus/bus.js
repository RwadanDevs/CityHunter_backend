import express from 'express';
import validator from '../../../middleware/validators';
import allow from '../../../middleware/roleAuthorisation';
import busController from '../../../controllers/busController';
import { authorizationCheck } from '../../../middleware/authorization';

const route = express.Router();
 
route.post(
        '/busses/route/:route_id', 
        authorizationCheck,
        validator.GetBusValidator,
        busController.AllBus,
    )

route.get(
        '/busses/:bus_id', 
        authorizationCheck, 
        busController.SpecificBus,
    )

route.post( 
        '/busses',
        authorizationCheck, 
        allow('Manager','Super Administrator'),
        validator.BusValidator,
        busController.createAbus,
    )

route.patch( 
        '/busses/:bus_id', 
        authorizationCheck,
        allow('Manager','Super Administrator'),
        validator.BusUpdateValidator,
        busController.updateAbus,
    )

export default route;
