import { sleep } from './time';
import { ajax, jsonp } from './network';
import { deepClone, getType, isComplexDataType } from './object';
declare const tools: {
    sleep: (time: number) => Promise<any>;
    jsonp: ({ url, params, callbackName }: import("./network").jsonParams) => Promise<any>;
    ajax: ({ method, url, params }: import("./network").ajaxParams) => Promise<any>;
    getType: (data: any) => string;
    isComplexDataType: (obj: any) => boolean;
    deepClone: (obj: any, hash?: WeakMap<object, any>) => any;
};
export default tools;
export { sleep, jsonp, ajax, getType, isComplexDataType, deepClone };
