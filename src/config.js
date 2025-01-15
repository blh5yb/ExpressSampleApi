import * as nodemailer from "nodemailer";
import { createLogger, format, transports } from 'winston';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  service: process.env.EMAIL_SERVICE,
  auth: {
      user: process.env.user,
      pass: process.env.pass,
  }
})

export const logger = createLogger({
  levels: logLevels,
  transports: [new transports.Console()],
});
