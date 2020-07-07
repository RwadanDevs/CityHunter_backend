import models from '../models';

const { stops } = models;

export default class stopServices {
    static createStop(newStop){
        return stops.create(newStop);
    }

    static updateAtt(set, prop) {
      return stops.update(set, {
        where: prop,
      });
    }

    static findById(id) {
        return stops.findOne({
          where: { id },
        });
    }

    static findByProp(prop) {
        return stops.findAll({
          where: prop,
        });
    }
}