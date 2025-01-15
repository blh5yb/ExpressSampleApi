import { assert } from "../helpers.js";
import * as productService from "../services/products.service.js";
import { logger } from "../config.js";

class Product {
    constructor(newProduct) {
        
        this.name = assert(newProduct, 'name');
        console.log(newProduct.name, this.name)
        this.description = assert(newProduct, 'description');
        this.price = assert(newProduct, 'price');
    }
}

const getByQueryParam = async (queryData, res) => {
    productService.getByUniqueField(queryData, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: error
            })
        } else {
            return res.status(200).send({
                success: 1,
                data: results,
                error: null
            })
        }
    })
}

export const getProductsController = async (req, res, next) => {
    const { name } = req.query
    if (name){
        getByQueryParam({name: name}, res)
    } else {
        return await productService.getAllProducts((error, results) => {
            if (error) {
                logger.fatal(error)
                return res.status(400).send({
                    success: 0,
                    data: "Bad request",
                    error: error
                })
            } else {
                logger.info(results)
                return res.status(200).send({
                    success: 1,
                    data: results,
                    error: null
                })
            }
        })
    }
}

export const getProductByIdController = async (req, res, next) => {
    productService.getProductById(req.params.id, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: error
            })
        } else {
            logger.info(results)
            return res.status(200).send({
                success: 1,
                data: results,
                error: null
            })
        }
    })
}

export const createProductController = async (req, res, next) => {
    const data = new Product(req.body)

    productService.createProduct(data, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: error
            })
        } else {
            logger.info(results)
            return res.status(200).send({
                success: 1,
                data: results,
                error: null
            })
        }
    })
}

export const updateProductController = async (req, res, next) => {
    const product = new Product(req.body)
    productService.updateProduct(req.params.id, product, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: error
            })
        } else {
            logger.info(results)
            return res.status(200).send({
                success: 1,
                data: results,
                error: null
            })
        }
    })
}

export const deleteProductController = async (req, res, next) => {
    productService.deleteProduct(req.params.id, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: error
            })
        } else {
            logger.info(results)
            return res.status(200).send({
                success: 1,
                data: results,
                error: null
            })
        }
    })
}