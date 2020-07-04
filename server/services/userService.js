import models from '../models';

const { users } = models;

export default class userServices {
    static createuser(newUser){
        return users.create(newUser);
    }
    
    static updateAtt(set, prop) {
        return users.update(set, {
            where: prop,
        });
    }

    static findByEmail(prop) {
        return users.findOne({
            where: prop,
        });
    }

    static findById(modelId) {
        return users.findOne({
            where: { id: modelId },
        });
    }
}