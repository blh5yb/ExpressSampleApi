import { logger } from './config.js';

export const assert = (data, value) => {
    if(!data[value]){
        throw new Error(`endpoint called without ${value} data`);
    } else {
        logger.error(`Input parameter, ${value}, successfully asserted`)
        return data[value];
    }

}