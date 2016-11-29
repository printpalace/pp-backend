import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import setupRoutes from './routes';
import getLogger from './libs/logger';
const logger = getLogger();
/**
 * Express application
 */
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/public', express.static('testWebInterface'));
setupRoutes(app);

const server = http.createServer(app);
server.listen(port);
server.on('error', (error) => {
  logger.error(error);
});
server.on('listening', () => {
  logger.info(`Backend started on port ${port}`);
});

/**
 * Connecto to MongoDB
 */


process.on('uncaughtException', function (err) {
  logger.error(String(err));
});
