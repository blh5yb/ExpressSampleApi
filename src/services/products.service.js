import productModel from "../models/product.model.js";


export const getAllProducts = async(callback) => {
    //const product = mongoose.model('Product', productSchema)
    try {
        const allProducts =  await productModel.find()
        //const allProducts = await product.find();
        return callback(null, allProducts)
    } catch (error){
        return callback("Error fetching products. " + error);
    }
}

export const getByUniqueField = async (queryData, callback) => {
    try {
        const product = await productModel.findOne(queryData)
        const results = product ? product : `Product not found`
        return callback(null, results)
    } catch (error) {
        return callback(`Error fetching product. ` + error);
    }
} 

export const getProductById = async (id, callback) => {
    try {
        const product = await productModel.findById(id)
        return callback(null, product)
    } catch (error){
        return callback(`Error fetching product with id, ${id}. ` + error);
    }
}

export const createProduct = async(reqBody, callback) => {
    try {
        //const product = {
        //    name: reqBody.name,
        //    description: reqBody.description,
        //    price: reqBody.price
        //}
        const product = new productModel({
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price
        })
        const savedProduct = await product.save()
        return callback(null, savedProduct)
    } catch(error){
        return callback("Error creating product. " + error)
    }
}

export const updateProduct = async(id, reqBody, callback) => {
    try {
        const savedProduct = await productModel.findOneAndUpdate({_id: id}, reqBody, {new: true})
        //const savedProduct = await product.save()
        return callback(null, savedProduct)
    } catch(error){
        return callback("Error updating product. " + error)
    }
}

export const deleteProduct = async(id, callback) => {
    try {
        await productModel.findOneAndDelete({_id: id})
        return callback(null, `Successfully deleted product with id: ${id}`)
    } catch (error) {
        return callback(`Error deleting product with id, ${id}. ` + error)
    }
}