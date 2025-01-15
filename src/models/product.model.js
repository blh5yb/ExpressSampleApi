import { Schema, model } from 'mongoose';


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: true
    }, 
    description: {
        type: String,
        required: [true, "description is required"],
        unique: false
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        unique: false
    }
});

export default model('Product', productSchema);