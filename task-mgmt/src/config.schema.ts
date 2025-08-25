import * as Joi from '@hapi/joi';

export const configValidation = Joi.object({
    STAGE: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
    AUTH_SECRET: Joi.string().required(),
    PORT: Joi.string().required(),
});
