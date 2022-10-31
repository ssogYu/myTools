/**
 * 获取变量类型
 * @param data
 * @returns
 */
export declare const getType: (data: any) => string;
/**
 * deepClone
 * 深拷贝
 *
 */
export declare const isComplexDataType: (obj: any) => boolean;
export declare const deepClone: (obj: any, hash?: WeakMap<object, any>) => any;
