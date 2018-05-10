//服务端接口访问的封装类
var { config, constants} = require('../config.js')
class serviceAPI {
  /** 
* 获取首页数据 
* u_type 默认是0
* @return {Promise}  
*/
  static home(u_type=0) {
    return getApp().globalData.wxAPI.getRequest(config.service.home,{
      u_type: u_type
    });
  }
  /**
   * 登录接口 传毒code ，密室，iv userinfo
   */
  static login(data ={}){
    var header = {};
    header[constants.WX_HEADER_CODE] = data.code;
    header[constants.WX_HEADER_ENCRYPTED_DATA] = data.encryptedData;
    header[constants.WX_HEADER_IV] = data.iv;
    return getApp().globalData.wxAPI.getRequest(config.service.loginUrl, data ={}, header);
  }
  /**
   * 获取题目分类的接口
   */
  static getQClass(){
    return getApp().globalData.wxAPI.getRequest(config.service.qClass,{});
  }
  /**
   * 根据题目的id获取题目的详情 
   */
  static getQDetail(qId){
    return getApp().globalData.wxAPI.getRequest(config.service.qDetail, {
      id:qId,
      openId: getApp().globalData.openId
    });
  }
  /**
   * //题目预览  qReview
   */
  static qReview(qId) {
    return getApp().globalData.wxAPI.getRequest(config.service.qReview, {
      qId: qId,
    });
  }
  /**
   * 点赞取消点赞
   * parise 1或者0
   * openId 用户id
   * qId 题的id
   */
  static qParise(qId, parise) {
    return getApp().globalData.wxAPI.getRequest(config.service.qparise, {
      qId: qId,
      openId: getApp().globalData.openId,
      parise: parise
    });
  }

  /**
  * 评论
  * parise 1或者0
  * openId 用户id
  * qId 题的id
  */
  static qComment(qId, comment) {
    return getApp().globalData.wxAPI.getRequest(config.service.qcomment, {
      qId: qId,
      openId: getApp().globalData.openId,
      comment: comment
    });
  }
  /**
   *     //获取第一道题 qftopic qId
   */
  static qftopic(qId) {
    return getApp().globalData.wxAPI.getRequest(config.service.qftopic, {
      qId: qId
    });
  }
  /**
   *  //获取下一道题 qtopic topicId
   *
   */
  static qtopic(topicId) {
    return getApp().globalData.wxAPI.getRequest(config.service.qtopic, {
      topicId: topicId
    });
  }

  /**
   * qfeedback  答题情况的反馈
   * topicId
   * qId
   * openId
   * choose
   * score
   */
  static qfeedback(topicId, qId, choose, score) {
    return getApp().globalData.wxAPI.getRequest(config.service.qfeedback, {
      topicId: topicId,
      qId: qId,
      openId: getApp().globalData.openId,
      choose: choose,
      score: score
    });
  }

  /**
   * 答题完成查看结果 qresult id  openId
   */
  static qresult(qId) {
    return getApp().globalData.wxAPI.getRequest(config.service.qresult, {
      id: qId,
      openId: getApp().globalData.openId
    });
  }
  /**
   * 获取视频的页面信息 
   */
  static videoClass(){
    return getApp().globalData.wxAPI.getRequest(config.service.videoclass, {});
  }

  /**
  * 获取视频的页面信息 观看视频的id
  */
  static videoPnum(id) {
    return getApp().globalData.wxAPI.getRequest(config.service.videoPnum, {
      id: id
    });
  }

  /**
   * 获取视频详情的接口
   */
  static videoDetail(id,tId) {
    return getApp().globalData.wxAPI.getRequest(config.service.videoDetail, {
      id: id,
      openId: getApp().globalData.openId,
      tId:tId
    });
  }
  /**
   * 关注老师的接口 
  */
  static focusT(focus, tId) {
    return getApp().globalData.wxAPI.getRequest(config.service.focusT, {
      focus: focus,
      openId: getApp().globalData.openId,
      tId: tId
    });
  }
  /**
   * 关注视频的接口
   */
  static focusV(focus, vId) {
    return getApp().globalData.wxAPI.getRequest(config.service.focusV, {
      focus: focus,
      openId: getApp().globalData.openId,
      vId: vId
    });
  }
  /**
   * 评论视频的接口
   */
  static vcomment(comment, vId) {
    return getApp().globalData.wxAPI.getRequest(config.service.vcomment, {
      comment: comment,
      openId: getApp().globalData.openId,
      vId: vId
    });
  }
  /**
   * 观看进度反馈的接口
   */
  static vfeedback(vCId, vId, progress) {
    return getApp().globalData.wxAPI.getRequest(config.service.vfeedback, {
      openId: getApp().globalData.openId,
      vId: vId,
      vCId: vCId,
      progress: progress
    });
  }
}

module.exports = serviceAPI; 