/*
 * @Author: TankSwift
 * @Date: 2022-10-30 21:07:57
 * @LastEditors: TankSwift
 * @LastEditTime: 2022-10-31 00:48:03
 * @Description: file content
 */
const webpack = require('webpack');
const path =require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV == 'development';
const outputType = process.env.OUTPUT_TYPE;
const getFileArr = () => {
    //es多入口打包
    const entryObject = {};
    const files = fs.readdirSync('src/tools');
    for(let value of files){
        const key = value.split('.')[0]
        if(key !== 'index'){
            entryObject[key]=`./src/tools/${value}`
        }
    }
    return entryObject;
}
const getPluginsArr = () => {
    const pluginArr = [
        new webpack.ProgressPlugin({}),
    ];
    if(isDev){
        pluginArr.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './public/index.html'),
                filename: 'index.html',
                title: 'tool test'
            })
        )
    }
    return pluginArr;
}
module.exports = {
    entry: outputType =='esm' 
        ? getFileArr() 
        : isDev ? './src/index.ts' : './src/tools/index.ts',
    output: outputType =='esm'
        ? {//esm
            path: path.resolve(__dirname, 'es'),
            filename:'[name].esm.js',
            clean: true,
            libraryTarget: 'module',
            chunkFormat: 'module',
            clean: true
        }
        : {//umd
            path: path.resolve(__dirname, 'lib'),
            filename: 'index.js',
            clean: true,
            library: 'myTool',//指定库的名称
            libraryTarget: 'umd',//输出的模块化格式，umd表示commonjs、amd、script方式都兼容
            globalObject: 'this',//兼容nodejs和浏览器环境
        },
    experiments: {    // 由于输出 ESM 格式文件为 Webpack 实验特性，因此需要加上此配置。
        outputModule: outputType === 'esm'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        hot: true,
        open: true,
    },
    plugins: getPluginsArr(),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    mode: isDev ? 'development' : 'production'
}