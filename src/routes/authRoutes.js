/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Api Authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       example:
 *         name: Barry
 *         email: blhykes@gmail.com
 *         password: supersecretpassword
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register User
 *     description: Create User Account
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User created
 */

import * as authControllers from '../controllers/auth.controller.js';
import express from 'express';
import { userValidation } from '../middleware/validation-middleware.mjs';

let authRouter = express.Router();

authRouter.post('/register', userValidation, authControllers.registrationController);
authRouter.post('/login', userValidation, authControllers.loginController);
authRouter.post('/refresh', authControllers.refreshController);
export default authRouter;