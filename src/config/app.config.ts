export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  mongodb: process.env.MONGODB || 'mongodb://localhost:27017/nest-pokemon',
  port: parseInt(process.env.PORT || '3001', 3001),
  defaultLimit: parseInt(process.env.DEFAULT_LIMIT || '10', 10),
});