import { v4 as uuidv4 } from 'uuid';
import Util from '../helpers/util';
import routeService from '../services/routeService';
import stopService from '../services/stopService';

const util = new Util();
 
export default class User {
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

        let stops = await stopService.findByProp({ route_id })

        if(!stops[0]){
            stops = [{ dataValues:'No Bus Stops Yet' }];
            await routeService.updateAtt({ status:'dormant' },{ id:route_id }) 
        }

        const data  = await stops.map(stop=>stop.dataValues)

        util.setSuccess(200,'Fetch Successful',{route: route.dataValues,stops: data})
        return util.send(res)
    }

    static async SpecificStop(req,res){
        const { role } = req.userData;
        const { stop_id } = req.params;

        const stop = await stopService.findById(stop_id)

        if(!stop){
            util.setError(404,'Bus Stop Not Found')
            return util.send(res)
        }

        const route = await routeService.findById(stop.dataValues.route_id)

        if(role === 'requester' && route.dataValues.status !== 'active'){
            util.setError(403,'Route Out of Service')
            return util.send(res)
        }

        util.setSuccess(200,'Fetch Successful',stop.dataValues)
        return util.send(res)
    }

    static async createAroute(req,res){
        const { PointA,PointB } = req.body;
        const uuid  = uuidv4();
        const similars = await routeService.findByProp({ PointA: PointA.toUpperCase() })

        if(similars[0]){
            const exist = similars.find(route => route.dataValues.PointB.toUpperCase() === PointB.toUpperCase() )
            if(exist){
                util.setError(409,'Route already Exits')
                return util.send(res)
            }
        }

        const newRoute =  {
            id:uuid,
            PointA: PointA.toUpperCase(),
            PointB: PointB.toUpperCase(),
        }
        await routeService.createRoute(newRoute) 
        
        util.setSuccess(201,`Route ${PointA}-${PointB} created successfully`,newRoute)
        return util.send(res)
    }

    static async updateAroute(req,res){
        const { PointA,PointB,status } = req.body;
        const { route_id } = req.params;
        const exist = await routeService.findById(route_id)

        if(!exist){
            util.setError(404,'Route NotFound')
            return util.send(res)
        }

        const newRoute =  { PointA,PointB,status }

        const route =  await routeService.updateAtt(newRoute,{ id:route_id }) 
        
        util.setSuccess(200,`Route ${PointA}-${PointB} updated successfully`,route.dataValues)
        return util.send(res)
    }

    static async createAstop(req,res){
        const { longitude,latitude,name } = req.body;
        const { route_id } = req.params;
        const uuid  = uuidv4();

        const exist = await routeService.findById(route_id)

        if(!exist){
            util.setError(404,'Route NotFound')
            return util.send(res)
        }

        const similars = await stopService.findByProp({ longitude })

        if(similars[0]){
            const exist = similars.find(route => route.dataValues.latitude === JSON.parse(latitude))
            if(exist){
                util.setError(409,'Route already Exits')
                return util.send(res)
            }
        }

        const names =  await stopService.findByProp({ name: name.toUpperCase() })
        
        if(names[0]){
            util.setError(409,'Name already taken')
            return util.send(res)
        }

        const newStop =  {
            id:uuid,
            latitude,
            longitude,
            name: name.toUpperCase(),
            route_id,
        }

        await stopService.createStop(newStop) 
        
        util.setSuccess(201,`${name} Bus Stop created successfully`,newStop)
        return util.send(res)
    }

    static async updateAstop(req,res){
        const { longitude,latitude,name } = req.body;
        const { stop_id } = req.params;
        const exist = await stopService.findById(stop_id)

        if(!exist){
            util.setError(404,'Stop NotFound')
            return util.send(res)
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
