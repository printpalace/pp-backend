import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import expressValidator = require('express-validator');

import {setupDB} from './db';
import setupRoutes from './routes';
import getLogger from './libs/logger';

dotenv.config();
const logger = getLogger();

/**
 * Normalize a port into a number, string, or false
 * @param val
 * @returns {number|string|boolean}
 */
function normalizePort(val): number|string|boolean {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Express application
 */
const app = express();
const port = normalizePort(process.env.PORT) || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressValidator());
app.use('/public', express.static('testWebInterface'));
setupRoutes(app);

/**
 * Start http server
 */
const server = http.createServer(app);
server.listen(port);
server.on('error', (error) => {
  logger.error(error);
  process.exit(1);
});
server.on('listening', () => {
  logger.info(`Backend started on port ${port}`);
});

/**
 * Connecto to MongoDB
 */
setupDB();

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', function (err) {
  logger.error(err);
});
