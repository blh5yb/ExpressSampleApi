import productModel from "../models/product.model.js";


export const getAllProducts = async(callback) => {
    //const product = mongoose.model('Product', productSchema)
    try {
        const allProducts =  await productModel.find()
        //const allProducts = await product.find();
        console.log('products', allProducts)
        return callback(null, allProducts)
    } catch (error){
        return callback("Error fetching products: " + error);
    }
}

export const getByUniqueField = async (queryData, callback) => {
    try {
        const product = await productModel.findOne(queryData)
        return callback(null, product)
    } catch (error) {
        return callback(`Error fetching product ${queryData}: ` + error);
    }
} 

export const getProductById = async (id, callback) => {
    try {
        const product = await productModel.findById(id)
        return callback(null, product)
    } catch (error){
        return callback(`Error fetching product with id, ${id}` + error);
    }
}

export const createProduct = async(reqBody, callback) => {
    try {
        const product = new productModel({
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price
        })
        console.log(product)
        const savedProduct = await product.save()
        return callback(null, savedProduct)
    } catch(error){
        return callback("Error creating product: " + error)
    }
}

export const updateProduct = async(id, reqBody, callback) => {
    productModel.findByIdAndUpdate(id, reqBody)
    try {
        const savedProduct = await product.save()
        return callback(null, savedProduct)
    } catch(error){
        return callback("Error creating product: " + error)
    }
}

export const deleteProduct = async(id, callback) => {
    try {
        await productModel.findByIdAndDelete(id)
        return callback(null, `Successfully deleted product with id: ${id}`)
    } catch (error) {
        return callback(`Error deleting product with id, ${id}` + error)
    }
}