import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import getLogger from './libs/logger';

dotenv.config();
const logger = getLogger();

export const setupDB = () => {
  const connect = () => {
    const uri = process.env.DB_URI;
    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS
    };
    mongoose.connect(uri, options);
  };

  mongoose.connection.on('connected', () => {
    logger.info('MONGODB', 'Connected to database');
  });

  mongoose.connection.on('connected', (err) => {
    logger.info('MONGODB', err);
  });

  mongoose.connection.on('disconnected', connect);

  connect();

  // TODO: define models
};
