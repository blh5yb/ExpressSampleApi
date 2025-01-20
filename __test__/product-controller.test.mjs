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
        productsService.getByUniqueField.mockImplementation((param, callback) => {
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
        productsService.getByUniqueField.mockImplementation((param, callback) => {
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

describe('POST /products', () => {
    let product2 = {_id: 'someId2', name: 'product2', description: 'desc 2', price: 5.0}
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
    it('Should create a product return status ok', async () => {
        const req = {
            body: product2,
        }
        productsService.createProduct.mockImplementation((reqBody, callback) => {
            return callback(null, product2)
        })
//
        await productControllers.createProductController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 1,
            data: product2,
            error: null
        });
        expect(mockRes.status).toHaveBeenCalledWith(200);
    })
    it('Should fail to create product and return status 400', async () => {
        const req = {
            body: {},
            query: {},
            params: {}
        }
        const error = "Error creating product"
        productsService.createProduct.mockImplementation((reqBody, callback) => {
            return callback(error, null)
        })
//
        await productControllers.createProductController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 0,
            data: "Bad request",
            error: error
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
    })
})

describe('PUT /products/:id ', () => {
    let product2 = {_id: 'someId2', name: 'product2', description: 'updated description', price: 5.25}
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
    it('Should update a product return status ok', async () => {
        const req = {
            body: product2,
            params: {id: product2._id}
        }
        productsService.updateProduct.mockImplementation((reqId, reqBody, callback) => {
            return callback(null, product2)
        })
//
        await productControllers.updateProductController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 1,
            data: product2,
            error: null
        });
        expect(mockRes.status).toHaveBeenCalledWith(200);
    })
    it('Should fail to update product2 and return status 400', async () => {
        const req = {
            body: product2,
            query: {},
            params: {id: product2._id}
        }
        const error = "Error updating product"
        productsService.updateProduct.mockImplementation((reqId, reqBody, callback) => {
            return callback(error, null)
        })
//
        await productControllers.updateProductController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 0,
            data: "Bad request",
            error: error
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
    })
})

describe('DELETE /products/:id Controller', () => {
    let product2 = {_id: 'someId2', name: 'product2', description: 'desc 2', price: 5.0}
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
    it('Should delete a product return status ok', async () => {
        const req = {
            params: {id: product2._id}
        }
        const results = `Successfully deleted product with id: ${product2._id}`
        productsService.deleteProduct.mockImplementation((reqId, callback) => {
            return callback(null, results)
        })
//
        await productControllers.deleteProductController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 1,
            data: results,
            error: null
        });
        expect(mockRes.status).toHaveBeenCalledWith(200);
    })
    it('Should fail to delete product2 and return status 400', async () => {
        const req = {
            body: {},
            query: {},
            params: {id: product2._id}
        }
        const error = "Error deleting product"
        productsService.deleteProduct.mockImplementation((reqId, callback) => {
            return callback(error, null)
        })
//
        await productControllers.deleteProductController(req, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith({
            success: 0,
            data: "Bad request",
            error: error
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
    })
})