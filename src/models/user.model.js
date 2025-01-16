import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    password: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true}
});

export default model('User', userSchema);