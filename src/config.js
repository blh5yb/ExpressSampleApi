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
    tags: [
      {name: 'API Entry Point', description: ''},
      {name: 'Auth', description: 'Api Authentication'},
      {name: 'Products', description: 'Product management'}
    ],
    authAction: {
      JWT: {
        name: "JWT",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: ""
        },
        value: "Bearer <JWT>"  // Placeholder value for the UI
      }
    },
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'description', 'price'],
          example: {
            name: 'Product1',
            description: 'sample product',
            price: 11.50
          },
          properties: {
            name: {
              type: 'string',
              description: 'The products name'
            },
            description: {
              type: 'string',
              description: 'The products description'
            },
            price: {
              type: 'string',
              description: 'The products price'
            }
          }
        },
        ProductWithId: {
          type: 'object',
          required: ['_id', 'name', 'description', 'price'],
          example: {
            _id: 'a12b3c',
            name: 'Product1',
            description: 'sample product',
            price: 11.50
          },
          properties: {
            _id: {type: 'string', description: 'Product ID'},
            name: {type: 'string',description: 'The products name'},
            description: {type: 'string', description: 'The products description'},
            price: { type: 'string', description: 'The products price'}
          }
        },
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          example: {
            name: 'Barry',
            email: 'example@email.com',
            password: '1234abcd'
          },
          properties: {
            name: {
              type: 'string',
              description: 'Name of the user'
            },
            email: {
              type: 'string',
              description: 'User login email'
            },
            password: {
              type: 'string',
              description: 'User Password'
            }
          }
        },
        UserWithId: {
          type: 'object',
          required: ['_id', 'name', 'email', 'password'],
          example: {
            name: 'Barry',
            email: 'example@email.com',
            password: '1234abcd',
            '_id': '1z2y3x'
          },
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            name: {
              type: 'string',
              description: 'Name of the user'
            },
            email: {
              type: 'string',
              description: 'User login email'
            },
            password: {
              type: 'string',
              description: 'User Password'
            }
          }
        },
      },
      securitySchemes: {
        bearerAuth: {
            type: 'http',
            name: 'authorization',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
            description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345"'
        },
        cookieAuth: {
            type: 'apiKey',
            name: 'refreshToken',
            in: 'cookie',
            scheme: 'bearer',
            description: 'Enter the refresh token'
        },
      },
    },
  },
  apis: ['src/index.mjs', 'src/routes/*.js'], // Path to your API docs
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
export const rateLimitConfig = {
  total: 20,
  duration_in_ms: 60000,
  delay_after: 1,
  window_ms: 15000,
  delay_in_ms: 2000,
}