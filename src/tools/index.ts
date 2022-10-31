import { sleep } from './time';
import { ajax, jsonp } from './network'
import { deepClone, getType, isComplexDataType } from './object';
const tools = {
    sleep,
    jsonp,
    ajax,
    getType,
    isComplexDataType,
    deepClone
}
export default tools;
export { sleep, jsonp, ajax, getType, isComplexDataType, deepClone };