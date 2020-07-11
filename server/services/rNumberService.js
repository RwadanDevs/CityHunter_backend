import models from '../models';

const { routeNumbers } = models;

export default class RouteStopServices {
    static createRouteStop(newRouteNumber){
        return routeNumbers.create(newRouteNumber);
    }

    static updateAtt(set, prop) {
      return routeNumbers.update(set, {
        where: prop,
      });
    }

    static deleteAtt(prop) {
      return routeNumbers.destroy({
        where: prop,
      });
    }

    static findById(id) {
        return routeNumbers.findOne({
          where: { id },
        });
    }

    static findByProp(prop) {
        return routeNumbers.findAll({
          where: prop,
        });
    }
}
