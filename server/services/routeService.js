import models from '../models';

const { routes } = models;

export default class routeServices {
    static createRoute(newRoute){
        return routes.create(newRoute);
    }

    static updateAtt(set, prop) {
      return routes.update(set, {
        where: prop,
      });
    }

    static findById(id) {
        return routes.findOne({
          where: { id },
        });
    }

    static getAllRoutes() {
      return routes.findAll();
    }
    
    static findByRouteNumber(prop) {
      return routes.findOne({
          where: { routeNumber: prop },
        });
    }
}
