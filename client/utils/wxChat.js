
// var Promise = require('../libs/es6-promise.js')
/** 
 * Promise化小程序接口 
 * Promise 调用then方法后会返回一个Promise使用return来返回  *下一个Promise对象来实现链式调用
 */
class Wechat {
  /** 
   * 登陆 
   * @return {Promise}  
   */
  static login() {
    return new Promise((resolve, reject) => wx.login({ success: resolve, fail: reject }));
  };

  /** 
   * 获取用户信息 
   * @return {Promise}  
   */
  static getUserInfo() {
    return new Promise((resolve, reject) =>        wx.getUserInfo({ success: resolve, fail: reject }));
  };

/**
 * 调用异步的封装方法
 */
static  httpsPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}

/**
 * 调用请求
 */
static requset(obj={}){
  return Wechat.httpsPromisify(wx.request)(obj)
}

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
static getRequest(url, data ={}) {
  var getRequest = Wechat.httpsPromisify(wx.request)
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
static postRequest(url, data) {
  var postRequest = Wechat.httpsPromisify(wx.request)
  return postRequest({
    url: url,
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
  })
}
};

module.exports = Wechat; 