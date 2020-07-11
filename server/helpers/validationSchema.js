import Joi from '@hapi/joi';

export const roleUpdateValidateSchema = Joi.object({
    role: Joi.string().min(5).required(),
    });

export const GetBusValidateSchema = Joi.object({
    origin: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/).required(),
    destination: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/).required(),
    });

export const routeValidateSchema = Joi.object({
    PointA: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/).required(),
    PointB: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/).required(),
    routeNumber: Joi.number().required(),
    company: Joi.string().required(),
    status: Joi.string(),
    });

export const stopValidateSchema = Joi.object({
    name: Joi.string().min(3).required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    routeNumbers: Joi.array().items(Joi.number()).required()
    });

export const BusValidateSchema = Joi.object({
    company: Joi.string().min(3).required(),
    plate: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/).required(),
    origin: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/),
    destination: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/),
    status: Joi.string(),
    });

export const BusUpdateValidateSchema = Joi.object({
    company: Joi.string().min(3).required(),
    plate: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/).required(),
    routeNumber: Joi.number().required(),
    origin: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/).required(),
    destination: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/).required(),
    status: Joi.string(),
    });
