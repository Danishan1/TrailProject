import { data } from './apiCode.js'

export const getStatusDetails = (code) => {
    return data[code];
}

