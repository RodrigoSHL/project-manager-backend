export const EnvConfiguration = () => ({
  stage: process.env.STAGE || 'dev',
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 10,
  jwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',
  database: {
    name: process.env.DB_NAME || 'ChampionshipDB',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'MySecr3tPassWord@as2',
  },
});
