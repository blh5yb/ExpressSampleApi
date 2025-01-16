import * as nodemailer from "nodemailer";
import { createLogger, format, transports } from 'winston';
import swaggerJSDoc from 'swagger-jsdoc';

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

export const secretKey = process.env.JWT_SECRET;

export const port = 3000
 // Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.3',
      info: {
          title: 'Sample Express Product Api',
          version: '1.0.0',
          description: 'A simple demo API using express.js framework',
      },
      servers: [
          { url: `http://localhost:${port}`}
      ],
 components: {
   securitySchemes: {
       bearerAuth: {
           type: 'http',
           scheme: 'bearer',
           bearerFormat: 'JWT', 
       },
   },
},
  },
  apis: ['src/index.mjs', 'src/routes/*.js'], // Path to your API docs
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);