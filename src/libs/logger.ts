import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

let logger;

const winstonConfig = {
  transports: [
    new winston.transports.Console({
      colorize: true
    }),
    new winston.transports.DailyRotateFile({
      name: 'all_logs',
      filename: path.join('logs', 'info_'),
      datePattern: 'yyyy-MM-dd.log',
      level: 'info'
    }),
    new winston.transports.DailyRotateFile({
      name: 'error_logs',
      filename: path.join('logs', 'error_'),
      datePattern: 'yyyy-MM-dd.log',
      level: 'error'
    })
  ]
};

export default (file = '') => {
  return logger ? logger : logger = new (winston.Logger)(winstonConfig);
};
