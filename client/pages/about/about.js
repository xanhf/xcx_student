// pages/about/about.js
var Wechat = require('../../utils/wxChat.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      callout:{
        content:"游泳幼儿园",
        display: 'ALWAYS'
      }
    }],
    polyline:[]
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
    this.mapCtx = wx.createMapContext('myMap')
    Wechat.getLocation().then(res=>
      {
      var latitude = res.latitude;
      var longitude = res.longitude;
      this.data.polyline = [
        {
          points: [
            {
              longitude: longitude,
              latitude: latitude
            }, {
              longitude: 113.324520,
              latitude: 23.099994
            }],
          color: "#4169E1",
          width: 2,
          dottedLine: true,
        }
      ];
      this.setData({
        polyline: this.data.polyline
      })
      })
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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})