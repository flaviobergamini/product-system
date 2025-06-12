require('dotenv').config();

const environment = process.env.ENVIRONMENT;

export const config = {
    DEV: environment === 'dev',
    PROD: environment === 'prod',

    PROJECT_NAME: ' ProductSystemApi',

    REDIS: {
    HOST: process.env.REDIS_HOST ?? 'localhost',
    PORT: Number(process.env.REDIS_PORT ?? 18961),
    USER_NAME: process.env.REDIS_USERNAME ?? '',
    PASSWORD: process.env.REDIS_PASSWORD ?? '',
  },

  DB: {
    url: process.env.DATABASE_URL ?? ''
  }
}
