
//**
//* @swagger
//* components:
//*   schemas:
//*     User:
//*       type: object
//*       required:
//*         - name
//*         - email
//*         - password
//*       example:
//*         name: Barry
//*         email: blhykes@gmail.com
//*         password: supersecretpassword
//*       properties:
//*         name:
//*           type: string
//*           description: The user's name
//*         email:
//*           type: string
//*           description: The user's email
//*         password:
//*           type: string
//*           description: The user's password
//*/

/**
 * @swagger
 * paths:
 *   /register:
 *     post:
 *       summary: Register User
 *       description: Create User Account
 *       tags:
 *         - Auth
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: User created.
 *           headers:
 *             X-Auth:
 *               description: The authorization token
 *           cookies:
 *             X-Auth-Refresh:
 *               description: The authorization token
 *   /login:
 *     post:
 *       summary: Register User
 *       description: Create User Account
 *       tags:
 *         - Auth
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: Login Successful.
 *           headers:
 *             X-Auth:
 *               description: The authorization token
 *           cookies:
 *             X-Auth-Refresh:
 *               description: The authorization token
 *   /refresh:
 *     post:
 *       summary: Refresh User Auth
 *       description: Use refresh token to generate new auth token
 *       tags:
 *         - Auth
 *       parameters:
 *         - in: cookie
 *           name: refreshToken
 *           description: Enter the refresh token
 *           required: true
 *       responses:
 *         200:
 *           description: Auth token refreshed.
 *           headers:
 *             X-Auth:
 *               description: The authorization token (expires in 1h)
 *           cookies:
 *             X-Auth-Refresh:
 *               description: The authorization token (expires in 1d)
 *         400:
 *            description: Missing or Invalid token.
 *         401:
 *           description: No refresh token provided.
 */

import * as authControllers from '../controllers/auth.controller.js';
import express from 'express';
import { userValidation } from '../middleware/validation-middleware.mjs';
import { rateLimiter, speedLimiter } from '../middleware/rate-limiter.mjs';

let authRouter = express.Router();

authRouter.post('/register', rateLimiter, userValidation, authControllers.registrationController);
authRouter.post('/login', rateLimiter, userValidation, authControllers.loginController);
authRouter.post('/refresh', speedLimiter, authControllers.refreshController);
export default authRouter;