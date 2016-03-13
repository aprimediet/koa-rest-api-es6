'use strict';

import winston from 'winston';
import path from 'path';
import fs from 'fs';

winston.emitErrs = true;

const getFilePath = m => m.filename.split('/').slice(-2).join('/');

const dirLog = path.join(process.cwd(), 'logs');
if (!fs.existsSync(dirLog)) {
  fs.mkdirSync(dirLog);
}
const filePath = path.join(dirLog, 'all.log');

export default function logger(module) {
  return new (winston.Logger)({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: filePath,
        handleException: true,
        json: true,
        maxSize: 5242880, // 5mb
        colorize: false
      }),
      new winston.transports.Console({
        level: 'debug',
        label: getFilePath(module),
        handleException: true,
        json: false,
        colorize: true
      })
    ],
    exitOnError: false
  });
}
