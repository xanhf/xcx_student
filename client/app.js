//app.js
let wxAPI = require('./utils/wxChat.js');
let serviceAPI = require('./utils/serviceAPI.js')

App({
  globalData: {
    wxAPI: wxAPI,
  },
  onLaunch: function () {
  },
  onShow: function (options) {
    this.getUserInfo();
  },
  onHide: function () {

  },
  onError: function (msg) {

  },
  getUserInfo:function(){
    wxAPI.login()
      .then(d => {
        console.log("登陆", d);
        this.globalData.loginResult = d;
        return wxAPI.getUserInfo();
      })
      .then(userResult => {
        console.log("获取用户信息", userResult);
        this.globalData.userInfo = userResult.userInfo;
        return serviceAPI.login({
          code: this.globalData.loginResult.code,
          encryptedData: userResult.encryptedData,
          iv: userResult.iv,
          userInfo: userResult.userInfo,
        });
      })
      .then(success => {
        this.globalData.userInfo = success.data.userinfo;
        this.globalData.openId = success.data.userinfo.openId;
        console.log("success login");
      })
      .catch(e => {
        console.log(e);
      })
  }
})