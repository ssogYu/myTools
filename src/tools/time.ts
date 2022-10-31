/**
 * sleep函数
 * @param time 延迟时间
 * @returns 
 */
 export const sleep = (time: number): Promise<any> => {
    return new Promise(resolve => setTimeout(resolve, time));
}