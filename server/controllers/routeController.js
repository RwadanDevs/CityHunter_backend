import { v4 as uuidv4 } from 'uuid';
import Util from '../helpers/util';
import routeService from '../services/routeService';
import stopService from '../services/stopService';
import routeNumberService from '../services/rNumberService';

const util = new Util();
 
export default class Route {
    static async AllRoute(req,res){
        const routes = await routeService.getAllRoutes();

        const data = await routes.map(route=>route.dataValues)
       
        util.setSuccess(200,'Fetch Successful',data)
        return util.send(res)
    }

    static async SpecificRouteStops(req,res){
        const { route_id } = req.params;
        const { role } = req.userData;

        const route = await routeService.findById(route_id)

        if(!route){
            util.setError(404,'Route not Found')
            return util.send(res)
        }
        
        if(role === 'requester' && route.dataValues.status !== 'active'){
            util.setError(403,'Route Out of Service')
            return util.send(res)
        }

        let stops = await routeNumberService.findByProp({ routeNumber : route.dataValues.routeNumber })

        if(!stops[0]){
            await routeService.updateAtt({ status:'dormant' },{ id:route_id }) 
        }
        const data  = [];
        for(const stop of stops){
            const exist  = await stopService.findById(stop.dataValues.stop_id)
            if(exist)
            data.push(exist.dataValues)
        }

        util.setSuccess(200,'Fetch Successful',{route: route.dataValues,stops: data})
        return util.send(res)
    }

    static async SpecificStop(req,res){
        const { stop_id } = req.params;
        let routes;

        const stop = await stopService.findById(stop_id)

        if(!stop){
            util.setError(404,'Bus Stop Not Found')
            return util.send(res)
        }

        routes = await routeNumberService.findByProp({ stop_id })

        util.setSuccess(200,'Fetch Successful',{ stop: stop.dataValues,routes })
        return util.send(res)
    }

    static async createAroute(req,res){
        const { PointA,PointB,routeNumber } = req.body;
        const uuid  = uuidv4();
        
        const route = await routeService.findByRouteNumber( routeNumber )

        if(route){
            const Error = {
                error: `Route Number ${routeNumber} already Taken`,
                tip: 'choose another Route number',
            }
            util.setError(409,Error)
            return util.send(res)
        }
        
        const newRoute =  {
            id:uuid,
            PointA,
            PointB,
            ...req.body,
        };

        await routeService.createRoute(newRoute) 
        
        util.setSuccess(201,`Route ${PointA} -- ${PointB} created successfully`,newRoute)
        return util.send(res)
    }

    static async updateAroute(req,res){
        const { routeNumber } = req.body;
        const { route_id } = req.params;

        const exist = await routeService.findById(route_id)

        if(!exist){
            util.setError(404,'Route NotFound')
            return util.send(res)
        }

        const route = await routeService.findByRouteNumber( routeNumber )
        
        if(route && route.dataValues.id !== route_id){
            const Error = {
                error: `Route Number ${routeNumber} already Taken`,
                tip: 'choose another Route number',
            }
            util.setError(409,Error)
            return util.send(res)
        }

        const data =  await routeService.updateAtt(req.body,{ id:route_id }) 
        
        util.setSuccess(200,`Route updated successfully`,data.dataValues)
        return util.send(res)
    }

    static async createAstop(req,res){
        const { longitude,latitude,name,routeNumbers } = req.body;
        const uuid  = uuidv4();

        const similars = await stopService.findByProp({ longitude })

        if(similars[0]){
            const exist = similars.find(route => route.dataValues.latitude === JSON.parse(latitude))
            if(exist){
                util.setError(409,'Stop already Exits')
                return util.send(res)
            }
        }

        for(const routeNumber of routeNumbers){
            const newRouteNumberStop = {
                stop_id:uuid,
                routeNumber,
            }
            await routeNumberService.createRouteStop(newRouteNumberStop)
        }
        
        const newStop =  {
            id:uuid,
            latitude,
            longitude,
            name,
        }

        await stopService.createStop(newStop) 
        
        util.setSuccess(201,`${name} Bus Stop created successfully`,newStop)
        return util.send(res)
    }

    static async updateAstop(req,res){
        const { longitude,latitude,name,routeNumbers } = req.body;
        const { stop_id } = req.params;

        for(const routeNumber of routeNumbers){
            const newRouteNumberStop = {
                stop_id,
                routeNumber
            }
            await routeNumberService.createRouteStop(newRouteNumberStop)
        }

        const newStop =  {
            latitude,
            longitude,
            name,
        }

        const stop =  await stopService.updateAtt(newStop,{ id:stop_id }) 
        
        util.setSuccess(200,`${name} Bus Stop updated successfully`,stop.dataValues)
        return util.send(res)
    }

}
