// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require("path");
const isProduction = false;

module.exports = {
  mode: "development",
  devtool: 'source-map',
  devServer: {
    hot: true,  // hrm，开启模块热替换
    hotOnly: true,  // 默认情况下（hotOnly:false），如果编译失败会刷新页面。设置了true后就不会刷新整个页面
    compress: true, // 开启gizp压缩
    port: 8082,  // 默认端口号8080
    // open: true,  //默认不打开浏览器
    /**
     * contentBase默认为package.json文件所在的根目录，即hss_webpack5目录
     * 打开localhost:8080/hss/demo.js,就会访问hss_webpack5目录下的hss目录下的demo.js。
     * 设置contentBase: path.resolve(__dirname, '../hss')后，打开localhost:8080/demo.js,即可访问hss_webpack5目录下的hss目录下的demo.js
     */
    contentBase: path.resolve(__dirname, '../hss'),
    watchContentBase: true, //监听contenBase目录
    historyApiFallback: true, //默认值：false，设置true后可解决spa页面刷新404
    // historyApiFallback: {
    //   rewrites: [
    //     // 如果publicPath设置了/abc，就不能直接设置historyApiFallback: true，这样会重定向到hss_webpack5根目录下的index.html
    //     // publicPath设置了/abc，就重定向到/abc，这样就可以了
    //     { from: /abc/, to: "/abc" }
    //   ]
    // },
    publicPath: "/", //devServer的publicPath建议与output的publicPath一致
    proxy: {
      '/api': {
        // target: 'https://www.zhengbeining.com/api/',  //默认：/api/type/pageList ===>https://www.zhengbeining.com/api/api/type/pageList
        target: 'http://42.193.157.44/api',  //默认：/api/type/pageList ===>https://www.zhengbeining.com/api/api/type/pageList
        secure: false, //默认情况下（secure: true），不接受在HTTPS上运行的带有无效证书的后端服务器。设置secure: false后，后端服务器的HTTPS有无效证书也可运行
        /**
         * changeOrigin，是否修改请求地址的源
         * 默认changeOrigin: false，即发请求即使用devServer的localhost:port发起的，如果后端服务器有校验源，就会有问题
         * 设置changeOrigin: true，就会修改发起请求的源，将原本的localhost:port修改为target，这样就可以通过后端服务器对源的校验
         */
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //重写后：/api/type/pageList ===>https://www.zhengbeining.com/api/type/pageList
        },
      },
    }
  },
  plugins: [
    // 开发环境
    // new ReactRefreshWebpackPlugin(),
  ]
}