import { validate, ParameterValidationError } from 'parameter-validator';

import { logger } from './config.js';

export const assert = (data, key) => {
    if(!data[key]){
        logger.error("parameter, " + key + ", not provided")
        throw new Error('invalid-argument', `endpoint called without ${key} data`);
    } else {
        console.log("Input parameter, " + key + " successfully asserted")
        logger.error("Input parameter, " + key + " successfully asserted")
        return data[key];
    }

}