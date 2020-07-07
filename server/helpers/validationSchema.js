import Joi from '@hapi/joi';

export const roleUpdateValidateSchema = Joi.object({
    role: Joi.string().min(5).required(),
    });

export const routeValidateSchema = Joi.object({
    PointA: Joi.string().min(3).required(),
    PointB: Joi.string().min(3).required(),
    });

export const routeUpdateValidateSchema = Joi.object({
    PointA: Joi.string().min(3),
    PointB: Joi.string().min(3),
    status: Joi.string().min(3)
    });

export const stopValidateSchema = Joi.object({
    name: Joi.string().min(3).required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    });
