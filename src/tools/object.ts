/**
 * 获取变量类型
 * @param data 
 * @returns 
 */
export const getType = (data: any): string => {
    let type = typeof data;
    if(type !== 'object'){
        return type;
    }
    return Object.prototype.toString.call(data).replace(/^\[object (\S+)\]$/, '$1');
}
/**
 * deepClone
 * 深拷贝
 *
 */
export const isComplexDataType = (obj: any) => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
export const deepClone = function (obj: any, hash = new WeakMap()) {
    if (obj.constructor === Date) {
        return new Date(obj)       // 日期对象直接返回一个新的日期对象
    }

    if (obj.constructor === RegExp) {
        return new RegExp(obj)     //正则对象直接返回一个新的正则对象
    }
    //如果循环引用了就用 weakMap 来解决
    if (hash.has(obj)) {
        return hash.get(obj)
    }
    let allDesc = Object.getOwnPropertyDescriptors(obj)

    //遍历传入参数所有键的特性
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

    // 把cloneObj原型复制到obj上
    hash.set(obj, cloneObj)

    for (let key of Reflect.ownKeys(obj)) {
        cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
    }
    return cloneObj
}