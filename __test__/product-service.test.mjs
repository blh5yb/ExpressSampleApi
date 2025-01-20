import mockingoose from "mockingoose";
import productModel from '../src/models/product.model.js';
import  * as productService from '../src/services/products.service.js'

describe('getAllProducts', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });
    let products = [
        {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    ]
    it('should successfully return all db products', async() => {
        mockingoose(productModel).toReturn(products, 'find')
        productService.getAllProducts((error, results) => {
            //expect(productModel).toHaveBeenCalled();
            expect(results.length).toEqual(products.length)
            expect(results[0].name).toEqual(products[0].name)
            expect(results[0].description).toEqual(products[0].description)
            expect(results[0].price).toEqual(products[0].price)
            expect(error).toBeNull();
        })
    })
    it('should fail to query products and return error', async() => {
        const myError = 'Threw test error'
        const errorRes = `Error fetching products. Error: ${myError}`
        mockingoose(productModel).toReturn(new Error(myError), 'find')

        productService.getAllProducts((error, results) => {
            //expect(productModel).toHaveBeenCalled();
            expect(error).toEqual(errorRes)
            expect(results).toBeUndefined();
        })
    })
} )

describe('Get by name or id', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });
    let product = {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    it('should successfully return product with same unique name', async() => {
        mockingoose(productModel).toReturn(product, 'findOne')
        productService.getByUniqueField({name: product.name}, (error, results) => {
            //expect(productModel).toHaveBeenCalled();
            expect(results.name).toEqual(product.name)
            expect(results.description).toEqual(product.description)
            expect(results.price).toEqual(product.price)
            expect(error).toBeNull();
        })
    })
    it('should should fail to find the product and return not found', async() => {
        mockingoose(productModel).toReturn(null, 'findOne')
        const queryData = {name: 'InvalidName'}
        productService.getByUniqueField(queryData, (error, results) => {
            console.log(results)
            expect(results).toEqual(`Product not found`)
            expect(error).toBeNull();
        })
    })
    it('should fail to query the db and return error', async() => {
        const myError = 'Threw test error'
        const errorRes = `Error fetching product. Error: ${myError}`
        mockingoose(productModel).toReturn(new Error(myError), 'findOne')

        productService.getByUniqueField({name: product.name}, (error, results) => {
            //expect(productModel).toHaveBeenCalled();
            expect(error).toEqual(errorRes)
            expect(results).toBeUndefined();
        })
    })
} )
describe('Create a product', () => {
    let product = {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    beforeEach(() => {
      mockingoose.resetAll();
    });
    it('should successfully create a product', (done) => {
        mockingoose(productModel).toReturn(product, 'save')

        productService.createProduct(product, (error, results) => {
            //expect(productModel).toHaveBeenCalled();
            expect(results.name).toEqual(product.name)
            expect(results.description).toEqual(product.description)
            expect(results.price).toEqual(product.price)
            expect(error).toBeNull();
            done();
        })

    })
    it('should fail to create new product', async() => {
        const myError = 'Threw test error'
        const errorRes = "Error creating product. Error: " + myError
        mockingoose(productModel).toReturn(new Error(myError), 'save')

        await productService.createProduct(product, (error, results) => {
            expect(error).toBe(errorRes)
            expect(results).toBeUndefined();
        })
    })
} )
describe('Update a product', () => {
    let product = {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    beforeEach(() => {
      mockingoose.resetAll();
    });
    it('should successfully update a products', async() => {
        mockingoose(productModel).toReturn(product, 'findOneAndUpdate')

        productService.updateProduct(product._id, product, (error, results) => {
            expect(results.name).toEqual(product.name)
            expect(results.description).toEqual(product.description)
            expect(results.price).toEqual(product.price)
            expect(error).toBeNull();
        })

    })
    it('should fail to query products and return error', async() => {
        const myError = 'Threw test error'
        const errorRes = `Error updating product. Error: ${myError}`
        mockingoose(productModel).toReturn(new Error(myError), 'findOneAndUpdate')

        productService.updateProduct(product._id, product, (error, results) => {
            //expect(productModel).toHaveBeenCalled();
            expect(error).toEqual(errorRes)
            expect(results).toBeUndefined();
        })
    })
} )
describe('Delete a product', () => {
    let product = {_id: 'someId', name: 'product1', description: 'desc 1', price: 1}
    beforeEach(() => {
      mockingoose.resetAll();
    });
    it('should successfully delete a product', async() => {
        mockingoose(productModel).toReturn(product, 'findOneAndDelete')

        productService.deleteProduct(product._id, (error, results) => {
            //expect(productModel).toHaveBeenCalled();
            expect(results).toEqual(`Successfully deleted product with id: ${product._id}`)
            expect(error).toBeNull();
        })
    })
    it('should fail to delete product by id', async() => {
        const myError = 'Threw test error'
        const errorRes = `Error deleting product with id, ${product._id}. Error: ${myError}`
        mockingoose(productModel).toReturn(new Error(myError), 'findOneAndDelete')

        productService.deleteProduct(product._id, (error, results) => {
            //expect(productModel).toHaveBeenCalled();
            expect(error).toEqual(errorRes)
            expect(results).toBeUndefined();
        })
    })
} )