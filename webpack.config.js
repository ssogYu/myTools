/*
 * @Author: TankSwift
 * @Date: 2022-10-30 21:07:57
 * @LastEditors: TankSwift
 * @LastEditTime: 2022-10-31 00:48:03
 * @Description: file content
 */
const webpack = require('webpack');
const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV == 'development';
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
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        clean: true,
        library: 'myTool',//指定库的名称
        libraryTarget: 'umd',//输出的模块化格式，umd表示commonjs、amd、script方式都兼容
        globalObject: 'this',//兼容nodejs和浏览器环境
        export: 'default', //指定将入口文件的默认导出作为库暴露
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