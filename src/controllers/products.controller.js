import * as productService from "../services/products.service.js";
import { logger } from "../config.js";

//class Product {
//    constructor(newProduct) {
//        this.name = newProduct.name
//        this.description = newProduct.description
//        this.price = newProduct.price
//    }
//}

const getByQueryParam = async (queryData, res) => {
    return await productService.getByUniqueField(queryData, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: `${error}`
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
        return await getByQueryParam({name: name}, res)
    } else {
        return await productService.getAllProducts((error, results) => {
            if (error) {
                logger.fatal(error)
                return res.status(400).send({
                    success: 0,
                    data: "Bad request",
                    error: `${error}`
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
    return await productService.getProductById(req.params.id, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: `${error}`
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
    //const data = new Product(req.body)

    return await productService.createProduct(req.body, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: `${error}`
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
    //const product = new Product(req.body)
    return await productService.updateProduct(req.params.id, req.body, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: `${error}`
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
    return await productService.deleteProduct(req.params.id, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(400).send({
                success: 0,
                data: "Bad request",
                error: `${error}`
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