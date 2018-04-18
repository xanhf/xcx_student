//服务端接口访问的封装类
var config = require('../config.js')
class serviceAPI {
  /** 
* 获取首页数据 
* u_type 默认是0
* @return {Promise}  
*/
  static home(u_type=0) {
    return getApp().globalData.wxAPI.getRequest(config.service.home, {
      u_type: u_type
    });
  }
}

module.exports = serviceAPI; 