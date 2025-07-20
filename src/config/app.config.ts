export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb+srv://<koyeb>:<bTrn3aDteNEGTK5T>@nest.dwygdyt.mongodb.net/?retryWrites=true&w=majority&appName=Nest',
  port: parseInt(process.env.PORT || '3001', 3001),
  defaultLimit: parseInt(process.env.DEFAULT_LIMIT || '10', 10),
});