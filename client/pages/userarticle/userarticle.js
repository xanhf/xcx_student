// pages/userarticle/userarticle.js
var pullToRefresh = require('../../utils/pullToRefresh.js')
var { config } = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    pullToRefresh.pullRefresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.hinde) {
      this.register();
    }
  },
  /**
   * 注册
   */
  register:function(){
    pullToRefresh.regist(this, config.service.getUserAriticle, {
      openId: getApp().globalData.openId
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.hinde = true
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.data.hinde = false
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    pullToRefresh.pullRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pullToRefresh.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})