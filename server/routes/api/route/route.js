import express from 'express';
import allow from '../../../middleware/roleAuthorisation';
import routeController from '../../../controllers/routeController';
import validator from '../../../middleware/validators';
import { authorizationCheck } from '../../../middleware/authorization';

const route = express.Router();

route.get('/routes', authorizationCheck, routeController.AllRoute)

route.get('/routes/:route_id', authorizationCheck, routeController.SpecificRouteStops)

route.get('/stops/:stop_id', authorizationCheck, routeController.SpecificStop)

route.post( 
        '/routes', 
        authorizationCheck, 
        allow('Manager'),
        validator.RouteValidator,
        routeController.createAroute,
    )

route.patch( 
        '/routes/:route_id', 
        authorizationCheck, 
        allow('Manager'),
        validator.RouteValidator,
        routeController.updateAroute,
    )
  
route.post( 
        '/stops', 
        authorizationCheck, 
        allow('Manager'),
        validator.StopValidator,
        routeController.createAstop,
    )

route.patch( 
        '/stops/:stop_id', 
        authorizationCheck, 
        allow('Manager'),
        validator.StopUpdateValidator,
        routeController.updateAstop,
    )

export default route;