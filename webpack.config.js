/*
* @Author: renmenghan
* @Date:   2017-07-21 11:47:23
* @Last Modified by:   renmenghan
* @Last Modified time: 2017-12-01 16:30:33
*/

var webpack             = require('webpack');
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin   = require('html-webpack-plugin');
// 环境变量配置 dev/online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
// 获取html-weback-plugin参数的方法
var getHtmlConfig = function(name,title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        // favicon     : './favicon.ico',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common','' + name + '']
    }
};

var config = {
     entry: {
        'common'                    : ['./src/page/common/index.js'],
        'index'                     : ['./src/page/index/index.js'],
        'list'                      : ['./src/page/list/index.js'],
        'detail'                    : ['./src/page/detail/index.js'],
        'result'                    : ['./src/page/result/index.js'],
        'user-login'                : ['./src/page/user-login/index.js'],
        'user-register'             : ['./src/page/user-register/index.js'],
        'user-pass-reset'           : ['./src/page/user-pass-reset/index.js'],
        'user-center'               : ['./src/page/user-center/index.js'],
        'user-center-update'        : ['./src/page/user-center-update/index.js'],
        'user-pass-update'          : ['./src/page/user-pass-update/index.js'],
     },
     output: {
         path: __dirname + '/dist',
         publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fa/dist/',
         filename: 'js/[name].js'
     },
     externals : {
     	'jquery' : 'window.jQuery'
     },
     module:  {
        loaders:  [
            {test: /\.css$/,loader:  ExtractTextPlugin.extract("style-loader","css-loader")},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=100&name=resource/[name].[ext]'},
            {
                test: /\.string$/,
                loader: 'html-loader',
                qury:{
                    minimize : true,
                    removeAttributeQuotes:false
                }
            }
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },

     plugins : [
        //独立通用模块到js.base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "js/base.js"
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // 对html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','重置密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),

     ]
 };
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

 module.exports = config;