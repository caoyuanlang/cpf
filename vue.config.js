/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-17 09:47:30
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-17 09:18:12
 * @FilePath: \vue\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//禁止语法检查
  devServer: {
    proxy: {
      '/evo-apigw': {
        target: 'https://140.249.211.40:7443',
        changeOrigin: true,
        ws: false,
        secure: false,
        pathRewrite: { // 请求路径重写
          '/evo-apigw': '/evo-apigw',   //重写请求路径
        },
      },
      '/evo-pic': {
        target: 'https://140.249.211.40:7443',
        changeOrigin: true,
        ws: false,
        secure: false,
      },
      '/api': {
        target: 'http://140.249.204.169:7001',
        changeOrigin: true,
        ws: false,
        secure: false,
      },
    }
  }
});

