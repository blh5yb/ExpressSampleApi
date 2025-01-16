
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */
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
 *   /products/{id}:
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
 *           required: true
 *           description: ID of the product to retrieve
 *       responses:
 *         200:
 *           description: Successfully returned the product
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product' 
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       example:
 *         name: Product1
 *         description: sample product
 *         price: 11.50
 *       properties:
 *         name:
 *           type: string
 *           description: The products name
 *         description:
 *           type: string
 *           description: The product description
 *         price:
 *           type: Number
 *           description: The product price
 */

//import express from 'express'; 
import * as ProductController from "../controllers/products.controller.js";
import express from 'express'; 
import { authenticate } from "../middleware/auth-middleware.mjs";
import { productValidation } from "../middleware/validation-middleware.mjs";

let productRouter = express.Router();

productRouter.get("/", ProductController.getProductsController)
productRouter.get("/:id", ProductController.getProductByIdController)
productRouter.post("/", authenticate, productValidation, ProductController.createProductController)
productRouter.put("/:id", authenticate, productValidation, ProductController.updateProductController)
productRouter.delete("/:id", authenticate, ProductController.deleteProductController)
export default productRouter;
