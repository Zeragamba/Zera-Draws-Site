import * as fs from 'fs'
import { LOG_DIR, NODE_ENV } from '../config'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'node:path'

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR)
}

const logfile = path.join(LOG_DIR, `${NODE_ENV}.log`)

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new DailyRotateFile({ filename: logfile }),
  ],
})
