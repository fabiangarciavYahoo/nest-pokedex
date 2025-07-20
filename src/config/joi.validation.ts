import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3001),
  // MONGODB: Joi.string().uri().default('mongodb+srv://nest.dwygdyt.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Nest'),
  DATABASE_URL: Joi.string().uri().default('mongodb+srv://koyeb:bTrn3aDteNEGTK5T@nest.dwygdyt.mongodb.net/?retryWrites=true&w=majority&appName=Nest'),
  DEFAULT_LIMIT: Joi.number().default(10),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
});