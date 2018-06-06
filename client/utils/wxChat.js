
// var Promise = require('../libs/es6-promise.js')
/** 
 * 微信相关
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
 * 获取用户信息 
 * @return {Promise}  
 */
  static getLocation() {
    return new Promise((resolve, reject) => wx.getLocation(
      { type: 'gcj02',success: resolve, fail: reject }));
  };

/**
 * 调用异步的封装方法
 */
static  httpsPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        if(res.statusCode==200){//访问成功
          resolve(res.data)//返回的数据
        }else{
          reject(res.errMsg)
        }
      };
      obj.fail = function (res) {
        reject(res.errMsg)
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
static getRequest(url, data ={},uheader = {}) {
  var getRequest = Wechat.httpsPromisify(wx.request);
  uheader["Content-Type"] =  'application/json';
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: uheader
  })
}

/**
 * 微信请求post方法封装
 * url 
 * data 以对象的格式传入
 */
  static postRequest(url, data, uheader = {}) {
  var postRequest = Wechat.httpsPromisify(wx.request)
  uheader["Content-Type"] = 'application/json';
  return postRequest({
    url: url,
    method: 'POST',
    data: data,
    header: uheader
  })
}
static showLoading(text="加载中..."){
  return new Promise((resolve, reject) => wx.showLoading({ title: text,mask:true, success: resolve, fail: reject }));
}

  static hideLoading(){
    wx.hideLoading();
}

  static startRfresh(){
    wx.startPullDownRefresh();
  }

  static stopRfresh(){
    wx.stopPullDownRefresh();
  }

  /**
   * 设置缓存
   */
  static setStorage(){

  }

  /**
 * 设置缓存 getStorage
 */
  static setStorage(key,value) {
    return new Promise((resolve, reject) => wx.setStorage({ key: key, data: value, success: resolve, fail: reject }));
  }

  /**
   * 获取缓存数据
   */
  static getStorage(key){
    return new Promise((resolve, reject) => wx.getStorage({ key: key ,success: resolve, fail: reject }));
  }
};

module.exports = Wechat; 