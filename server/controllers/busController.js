import Util from '../helpers/util';
import routeService from '../services/routeService';
import busService from '../services/busServices';

const util = new Util();
 
export default class Bus {

    static async createAbus(req,res){
        const { plateNumber } = req.body;

        const busPlate  = await busService.findByPlate( plateNumber );

        if(busPlate){
            util.setError(409,'Bus plate number already registered')
            return util.send(res)
        }

        const newBus = await busService.createBus(req.body)

        util.setSuccess(201,'Bus created succesfuly',newBus.dataValues)
        return util.send(res)
    }

    static async updateAbus(req,res){
        const { bus_id } = req.params;
        const { plateNumber,routeNumber } = req.body;

        const bus = await busService.findById(bus_id)

        if(!bus){
            util.setError(404,'Bus not Found')
            return util.send(res)
        }

        const busByPlate = await busService.findByPlate( plateNumber );

        if(busByPlate && busByPlate.dataValues.id !== bus.dataValues.id){
            util.setError(409,'plate number already exits')
            return util.send(res)
        }

        const route = await routeService.findByRouteNumber( routeNumber )

        if(!route){
            util.setError(404,'Invalid Route Number')
            return util.send(res)
        }
        
        await busService.updateAtt({...req.body,status:'active'},{ id:bus_id })

        util.setSuccess(200,'Bus updated succesfuly')
        return util.send(res)
    }

    static async AllBus(req,res){
        const { route_id } = req.params;
        const { role } = req.userData;
        const { origin,destination } = req.body;

        const route = await routeService.findById(route_id)

        if(!route){
            util.setError(404,'Route not Found')
            return util.send(res)
        }

        if(role === 'requester' && route.dataValues.status !== 'active'){
            util.setError(403,'Route Out of Service')
            return util.send(res)
        }

        let busses = await busService.findByProp({ routeNumber:route.dataValues.routeNumber })

        if(!busses[0]){
            util.setError(404,'No Busses Found on this route')
            return util.send(res)
        }

        const data  = await busses.filter(bus=>{
            if(
                bus.dataValues.origin === origin
                &&
                bus.dataValues.destination === destination
            ){
                return bus.dataValues
            }
        })

        if(!data[0]){
            util.setError(404,'No Bus Found In Your Direction')
            return util.send(res)
        }

        util.setSuccess(200,'Fetch success',{route,busses: data})
        return util.send(res)
    }

    static async SpecificBus(req,res){
        const { bus_id } = req.params;

        const bus = await busService.findById(bus_id)

        if(!bus){
            util.setError(404,'Bus not Found')
            return util.send(res)
        }

        util.setSuccess(200,'Fetch success',bus.dataValues)
        return util.send(res)
    }
}
