// pages/qhistory/qhistory.js
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
    pullToRefresh.regist(this, config.service.getqbrowse, {
      openId: getApp().globalData.openId
    });
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    pullToRefresh.pullRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数 loadMore
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