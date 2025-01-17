/**
 * @swagger
 * paths:
 *   /products:
 *     get:
 *       summary: List products
 *       description: List all products or add 'name' query param to get a product by name
 *       tags:
 *         - Products
 *       parameters:
 *         - in: query
 *           name: name
 *           schema:
 *             type: string
 *           description: name of product to query
 *       responses:
 *         200:
 *           description: Successfully returned data
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/ProductWithId' 
 *                   - type: array
 *                     items:
 *                       $ref: '#/components/schemas/ProductWithId' 
 *   /products/:id:
 *     get:
 *       summary: Find A Product
 *       description: Get A Product By Id Path Variable
 *       tags:
 *         - Products
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: product id to query
 *       responses:
 *         200:
 *           description: Successfully returned the product
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ProductWithId'
*/

/**
 * @swagger
 * paths:
 *   /products:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       summary: Create a product
 *       description: Create a product
 *       tags:
 *         - Products
 *       parameters:
 *         - in: header
 *           name: authorization
 *           schema:
 *             type: string
 *           description: 'Enter the auth token'
 *           required: false
 *         - in: cookie
 *           name: refreshToken
 *           description: 'Enter the refresh token'
 *           required: false
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       responses:
 *         200:
 *           description: Successfully created the product
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ProductWithId'
 *   /products/:id:
 *     put:
 *       security:
 *         - JWT: []
 *       summary: Update a product
 *       description: Update a product
 *       tags:
 *         - Products
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       parameters:
 *         - in: header
 *           name: authorization
 *           schema:
 *             type: string
 *           description: 'Enter the auth token'
 *           required: false
 *         - in: cookie
 *           name: refreshToken
 *           description: 'Enter the refresh token'
 *           required: false
 *       responses:
 *         200:
 *           description: Successfully updated the product
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ProductWithId'
*/

/**
 * @swagger
 * /products/:id:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a product
 *     description: Delete a product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *         description: 'Enter the auth token with'
 *         required: false
 *       - in: cookie
 *         name: refreshToken
 *         description: 'Enter the refresh token'
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully deleted the product
 *       403: 
 *         description: You do not have necessary permissions for the resource
*/

//import express from 'express'; 
import * as ProductController from "../controllers/products.controller.js";
import express from 'express'; 
import { authenticate } from "../middleware/auth-middleware.mjs";
import { productValidation } from "../middleware/validation-middleware.mjs";
import { rateLimiter, speedLimiter } from "../middleware/rate-limiter.mjs";

let productRouter = express.Router();

productRouter.get("/", speedLimiter, ProductController.getProductsController)
productRouter.get("/:id", speedLimiter, ProductController.getProductByIdController)
productRouter.post("/", rateLimiter, authenticate, productValidation, ProductController.createProductController)
productRouter.put("/:id", rateLimiter, authenticate, productValidation, ProductController.updateProductController)
productRouter.delete("/:id", rateLimiter, authenticate, ProductController.deleteProductController)
export default productRouter;
