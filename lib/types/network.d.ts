export interface jsonParams {
    url: string;
    params: any;
    callbackName: string;
}
export interface ajaxParams {
    method: string;
    url: string;
    params: any;
}
/**
 * 基于promise封装实现jsonp
 * @param url: 请求地址
 * @param params: 参数
 * @param callback: 回调函数名称
 * @returns
 */
export declare const jsonp: ({ url, params, callbackName }: jsonParams) => Promise<any>;
/**
 * 基于promsie封装ajax
 * @param param0
 * @returns
 */
export declare const ajax: ({ method, url, params }: ajaxParams) => Promise<any>;
