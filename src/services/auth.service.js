import bcrypt from 'bcryptjs/dist/bcrypt.js';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import { secretKey } from '../config.js';

export const createUser = async(reqBody, callback) => {
    try {
        const newUser = new userModel({
            name: reqBody.username,
            email: reqBody.email,
            password: await bcrypt.hash(reqBody.password, 10)
        })
        const savedUser = await newUser.save();
        const accessToken = jwt.sign({userId: savedUser._id}, secretKey, {expiresIn: '1h'});
        const refreshToken = jwt.sign({userId: savedUser._id}, secretKey, {expiresIn: '1d'});
        return callback(null, {newUser, accessToken, refreshToken});
    } catch (error){
        return callback(`Error registering user ${reqBody.name}: ${error}`)
    }
}

export const signInUser = async(reqBody, callback) => {
    try {
        const user = await userModel.findOne({email: reqBody.email})
        if (!user){
            return callback(`Authentication Failed: ${error}`)
        }
        const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
        if (!passwordMatch){
            return callback(`Authentication Failed: ${error}`)
        }
        const accessToken = jwt.sign({userId: user._id}, secretKey, {expiresIn: '1h'});
        const refreshToken = jwt.sign({userId: user._id}, secretKey, {expiresIn: '1d'});
        return callback(null, {user, accessToken, refreshToken});
    } catch (error) {
        return callback(`Login failed: ${error}`)
    }
}

export const refreshUser = async(refreshToken, callback) => {
    try {
        const decoded = jwt.verify(refreshToken, secretKey);
        const accessToken = jwt.sign({user: decoded.user}, secretKey, {expiresIn: '1h'})
        return callback(null, {accessToken, decoded})
    } catch (error) {
        return callback(`Invalid refresh token: ${error}`)
    }
}