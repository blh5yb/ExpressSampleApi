// Load environment variables
import "./loadEnvironment.js";
import helmet from "helmet";
import express from 'express'; 
import bodyParser from 'body-parser';
import connectDb from "./db/conn.js";
import serverless from 'serverless-http';
import swaggerUi from  'swagger-ui-express';
//import * as swaggerFile from './swagger_output.json'
//const swaggerFile = require('./swagger_output.json');
import { appSecret, appSession, port, swaggerDocs } from "./config.js";
import { rateLimiter } from "./middleware/rate-limiter.mjs";

const app = express();
//app.use(cors());
//app.use(express.json());

//import cors from 'cors';
//const corsOptions = {
//  origin: ['*'],//(https://your-client-app.com)
//  optionsSuccessStatus: 200,
//};
//app.use(cors(corsOptions))  // can use as middleware on certain routes
// some extra security
app.use(session({
  name: appSession,
  secret: appSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true}  // Ensure cookies are only sent over HTTPS
}))
// Use Helmet for securing HTTP headers
if (!isDev){
  app.use(helmet()); 
  app.use((req, res, next) => {  // redirect to https
    if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//app.use(bodyParser.json())
/**
 * @swagger
 * /:
 *   get:
 *     description: Prints Hello world
 *     summary: Hello World
 *     tags:
 *       - API Entry Point
 *     responses:
 *       200:
 *         description: API is working
 */
app.get('/', rateLimiter, (req, res) => {
    res.send('Hello World!');
});

import authRouter from "./routes/authRoutes.js";
app.use('/', authRouter);
import productRouter  from './routes/products.js';
import session from "express-session";
app.use("/products", productRouter);

await connectDb()
app.listen(port, () => {
  console.log(`Server is listening on port, ${port}`);
})

export const handler = serverless(app)
export default app