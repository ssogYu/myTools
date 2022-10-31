export interface jsonParams {
    url: string,
    params: any,
    callbackName: string,
}
export interface ajaxParams {
    method: string,
    url: string,
    params: any
}
/**
 * 基于promise封装实现jsonp
 * @param url: 请求地址 
 * @param params: 参数 
 * @param callback: 回调函数名称 
 * @returns
 */
export const jsonp = ({ url, params, callbackName }: jsonParams): Promise<any> => {
    const _window = window as any;
    return new Promise((resolve)=>{
        const script = document.createElement('script');
        const paramsArr = [];
        _window[callbackName] = (data: any) => {
            resolve(data);
            document.body.removeChild(script);
        }
        for(let key in params){
            paramsArr.push(`${key}=${params[key]}`);
        }
        script.type = 'text/javascript';
        script.src=`${url}?callback=${callbackName}&${paramsArr.join('&')}`;
        document.body.appendChild(script);
    })
}
/**
 * 基于promsie封装ajax
 * @param param0 
 * @returns 
 */
export const ajax = ({ method, url, params }: ajaxParams): Promise<any> => {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        method = method.toUpperCase();
        let paramsArr = [];
        let paramsData = null;
        for(let key in params){
            paramsArr.push(`${key}=${params[key]}`);
        }
        const paramsStr=paramsArr.join('&');
        if(method == "GET"){
            url = `${url}?${paramsStr}`
        }
        if(method == "POST"){
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            paramsData = paramsStr
        }
        xhr.open(method, url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status <= 300) {
                  resolve(JSON.parse(xhr.responseText))
                } else {
                  reject('请求出错')
                }
              }
        };
        xhr.send(paramsData);
    })
}