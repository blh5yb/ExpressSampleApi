import mockingoose from "mockingoose";
import productModel from '../src/models/product.model.js';
//const app = require('../src/index.mjs')
//const request = require('supertest')
import  * as productService from '../src/services/products.service.js'

//import {describe, expect, test, it} from '@jest/globals';

describe('Product Services', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });
    let products = [
        {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    ]
    it('should successfully return all db products', async() => {
        mockingoose(productModel).toReturn(products, 'find')

        //const response = await request(app).get(`/products`);
        //expect(response.status).toBe(200);

        productService.getAllProducts((error, results) => {
            //expect(productModel).toHaveBeenCalled();
            expect(results.length).toEqual(products.length)
            expect(results[0].name).toEqual(products[0].name)
            expect(results[0].description).toEqual(products[0].description)
            expect(results[0].price).toEqual(products[0].price)
            expect(error).toBeNull();
        })

    })
    //context('/products GET endpoint', () => {
        //it('should successfully return all db products', async() => {
        //    const callback = (error, results) => {
        //        if (error) {
        //            logger.fatal("Error fetching products: " +error )
        //        } else {
        //            logger.info(results)
        //        }
        //    }
        //})
        //it('should successfully return all db products', async() => {
        //    const callback = (error, results) => {
        //        if (error) {
        //            logger.fatal("Error fetching products: " +error )
        //        } else {
        //            logger.info(results)
        //        }
        //    }
        //})
        //it('should successfully return all db products', async() => {
        //    const callback = (error, results) => {
        //        if (error) {
        //            logger.fatal("Error fetching products: " +error )
        //        } else {
        //            logger.info(results)
        //        }
        //    }
        //})
    //})

} )