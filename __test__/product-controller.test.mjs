import * as productControllers from '../src/controllers/products.controller';
import mockingoose from "mockingoose";
import { jest, expect} from '@jest/globals';
import productModel from '../src/models/product.model';

describe('Products Controller', () => {
    beforeAll(async () => {
    })
    afterAll(async () => {})

    let mockRes;
    beforeEach(async () => {
        mockingoose.resetAll();
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })
    afterEach(() => {

    })
    let products = [
        {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    ]
    it('Should get all products and return status ok', async () => {
        mockingoose(productModel).toReturn(products, 'find')
        const req = {
            body: {},
            query: {},
            params: {}
        }
//
        await productControllers.getProductsController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalled();
        
        expect(mockRes.status).toHaveBeenCalledWith(200);
    })
})