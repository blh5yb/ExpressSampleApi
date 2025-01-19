import { jest, expect} from '@jest/globals';

jest.unstable_mockModule('../src/services/products.service.js', async () => ({
    getAllProducts: jest.fn(),
    getByUniqueField: jest.fn(),
    getProductById: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn()
    
}) )
const productControllers = await import('../src/controllers/products.controller')
let productsService = await import('../src/services/products.service');
describe('GET /products', () => {
    beforeAll(async () => {
    })
    afterAll(async () => {})

    let mockRes;
    let product1 = {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    beforeEach(async () => {
        //mockingoose.resetAll();
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })
    afterEach(() => {
        jest.resetAllMocks();
    })
    let products = [product1]
    it('Should get all products and return status ok', async () => {
        const req = {
            body: {},
            query: {},
            params: {}
        }
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
    it('Should get the product by name and return status ok', async () => {
        const req = {
            body: {},
            query: {},
            params: {}
        }
        productsService.getAllProducts.mockImplementation((callback) => {
            return callback(null, product1)
        })
//
        await productControllers.getProductsController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 1,
            data: product1,
            error: null
        });
        expect(mockRes.status).toHaveBeenCalledWith(200);
    })
    it('Should throw an error and return status 400', async () => {
        const req = {
            body: {},
            query: {},
            params: {}
        }
        const error = "An error occurred"
        productsService.getAllProducts.mockImplementation((callback) => {
            return callback(error, null)
        })
//
        await productControllers.getProductsController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 0,
            data: "Bad request",
            error: error
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
    })
})

describe('GET /products/:id', () => {
    let product1 = {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    beforeAll(async () => {
    })
    afterAll(async () => {})

    let mockRes;
    beforeEach(async () => {
        //mockingoose.resetAll();
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })
    afterEach(() => {
        jest.resetAllMocks();
    })
    it('Should get a product by id path variable return status ok', async () => {
        const req = {
            body: {},
            query: {},
            params: {id: 'someId'}
        }
        productsService.getProductById.mockImplementation((param, callback) => {
            return callback(null, product1)
        })
//
        await productControllers.getProductByIdController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 1,
            data: product1,
            error: null
        });
        expect(mockRes.status).toHaveBeenCalledWith(200);
    })
    it('Should throw an error and return status 400', async () => {
        const req = {
            body: {},
            query: {},
            params: {}
        }
        const error = "An error occurred"
        productsService.getProductById.mockImplementation((param, callback) => {
            return callback(error, null)
        })
//
        await productControllers.getProductByIdController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 0,
            data: "Bad request",
            error: error
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
    })
})