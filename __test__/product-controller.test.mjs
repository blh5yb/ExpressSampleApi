//import * as productControllers from '../src/controllers/products.controller';
import mockingoose from "mockingoose";
import { jest, expect} from '@jest/globals';
import productModel from '../src/models/product.model';

jest.unstable_mockModule('../src/services/products.service.js', async () => ({
    getAllProducts: jest.fn()
}) )
const productControllers = await import('../src/controllers/products.controller')
describe('Products Controller Tests', () => {
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
    let product1 = {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    let products = [product1]
    it('Should get all products and return status ok', async () => {
        mockingoose(productModel).toReturn(products, 'find')
        const req = {
            body: {},
            query: {},
            params: {}
        }
        let productsService = await import('../src/services/products.service');
        productsService.getAllProducts.mockImplementation((callback) => {
            return callback(null, products)
        })
//
        await productControllers.getProductsController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 1,
            data: products,
            error: null
        });
        
        expect(mockRes.status).toHaveBeenCalledWith(200);
    })
})