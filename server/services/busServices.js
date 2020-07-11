import models from '../models';

const { busses } = models;

export default class BusServices {
    static createBus(newBus){
        return busses.create(newBus);
    }

    static updateAtt(set, prop) {
      return busses.update(set, {
        where: prop,
      });
    }

    static findById(id) {
        return busses.findOne({
          where: { id },
        });
    }

    static findByPlate(plateNumber) {
      return busses.findOne({
        where: { plateNumber },
      });
  }

    static findByProp(prop) {
        return busses.findAll({
          where: prop,
        });
    }
}