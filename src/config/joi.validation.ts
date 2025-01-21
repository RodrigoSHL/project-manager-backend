import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  STAGE: Joi.string().valid('dev', 'prod', 'test').default('dev'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(10),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
