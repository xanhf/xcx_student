//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
let wxAPI =require('./utils/wxChat.js')

App({
  globalData: {},
  onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    onShow: function (options) {
      wxAPI.login()
        .then(d => {
          console.log("登陆", d);
          return wxAPI.getUserInfo();
        })
        .then(d => {
          console.log("获取用户信息", d);
        })
        .catch(e => {
          console.log(e);
        })  
    },
    onHide: function () {
      
    },
    onError: function (msg) {
      
    },
})