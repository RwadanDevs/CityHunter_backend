import Joi from '@hapi/joi';

export const roleUpdateValidateSchema = Joi.object({
    role: Joi.string().min(5).required(),
    });