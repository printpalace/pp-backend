import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import getLogger from './libs/logger';

dotenv.config();
const logger = getLogger();

let reconnectNumber = 0;
const shortReconnectTime = 10;
const longReconnectTime = 60;

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
    reconnectNumber = 0;
    logger.info('MONGODB', 'Connected to database');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MONGODB', String(err));
  });

  mongoose.connection.on('disconnected', () => {
    const reconnectTime = reconnectNumber === 0 ? 0 : (reconnectNumber < 3 ? shortReconnectTime : longReconnectTime);
    reconnectNumber++;
    logger.warn('MONGODB', `Will try to reconnect in ${reconnectTime} sec.`);
    setTimeout(connect, reconnectTime * 1000);
  });

  connect();

  // TODO: define models
};
