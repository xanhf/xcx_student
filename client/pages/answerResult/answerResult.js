// pages/answerResult/answerResult.js 答题结果的页面
var serviceApi = require('../../utils/serviceAPI.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载 qresult
   */
  onLoad: function (options) {
    this.data.qId = options.qId;
    this.qbrowse(this.data.qId)
    serviceApi.qresult(options.qId).then(res => {
        this.data.data=res.data.data;
        this.data.feedback = res.data.feedback;
        this.setData({
          data: this.data.data,
          feedback: this.data.feedback 
        });
    });
  },
  /**
 * 浏览记录
 */
  qbrowse: function (id) {
    serviceApi.qbrowse(id, 1).then(res => {
      this.data.qDetai = res.data;
      this.setData({
        qDetai: this.data.qDetai
      });
    });
  },
  /**
   * 进入查看排行榜
   */
  answerRank:function(event){
    wx.navigateTo({
      url: '../answerRank/answerRank?id=' + this.data.qId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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