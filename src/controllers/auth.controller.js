import * as authService from '../services/auth.service.js';
import { logger } from "../config.js";

//class User {
//    constructor(user) {
//        this.email = user.email
//        this.password = user.password
//        this.name = user.name
//    }
//}

export const registrationController = async(req, res, next) => {
    //const user = new User(req.body)
    return await authService.createUser(req.body, (error, results) => {
        if (error) {
            logger.fatal(error)
            return res.status(500).send({
                success: 0,
                message: 'Authentication failed',
                error: `${error}`
            })
        } else {
            const {user, accessToken, refreshToken} = results
            logger.info(`token created`)
            return res.status(200)
            .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
            .header('Authorization', accessToken)
            .send({
                success: 1,
                data: user,
                error: null
            })
        }
    })
}

export const loginController = async(req, res, next) => {
    //const user = new User(req.body, res)
    return await authService.signInUser(req.body, (error, results) => {
        if (error) {
            logger.fatal(error)
            if (error.includes('Authentication failed')){
                return res.status(401).send({
                    success: 0,
                    message: 'Authentication failed',
                    error: `${error}`
                })
            } else {
                return res.status(500).send({
                    success: 0,
                    message: 'Login failed',
                    error: `${error}`
                })
            }
        } else {
            const {user, accessToken, refreshToken} = results
            logger.info(`token created`)
            return res.status(200)
            .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
            .header('Authorization', accessToken)
            .send({
                success: 1,
                data: user,
                error: null
            })
        }
    })
}

export const refreshController = async(req, res, next) => {
    const refreshToken = (req.cookies && req.cookies['refreshToken']) ? req.cookies['refreshToken'] : null
    if (!refreshToken){
        return res.status(401).send({
            success: 0,
            message: 'Access Denied',
            error: 'No refresh token provided'
          });
    } else {
        return await authService.refreshUser(refreshToken, (error, results) => {
            if (error){
                return res.status(400)
                .send({
                    success: 1,
                    message: 'Invalid refresh token.',
                    error: `${error}`
                })
            } else {
                const {accessToken, decoded} = results
                return res.status(200)
                    .header('Authorization', accessToken)
                    .send({
                        success: 1,
                        data: decoded.user,
                        error: null
                    })
            }
        })
    }
}