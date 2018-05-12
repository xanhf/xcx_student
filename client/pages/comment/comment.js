// pages/comment/comment.js 评论的页面
var serviceApi = require('../../utils/serviceAPI.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   * 传入评论的类型
   * 评论的视频或者题目的id
   */
  onLoad: function (options) {
      this.type = options.type;
      this.id = options.id;
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
  
  },
  /**
   * 获取到评论的内容
   */
  commentDes:function(comment){
    this.comment = comment.detail.value;
  },
  /**
   * 点击评论提交
   */
  submmit:function(event){
    if (!this.comment){
      wx.showToast({
        title: '请输入评论内容'
      })
      return;
    }
    if (this.type=="question"){
      serviceApi.qComment(this.id, this.comment).then(res => {
        this.submitSuccess();
      });
    }else if(this.type=="video"){
      serviceApi.vcomment(this.comment, this.id).then(res => {
        this.submitSuccess();
      });
    }
  },
  /**
   *评论成功   getCurrentPages
   */
  submitSuccess:function(){
    var pages = getCurrentPages();//获取当前页面信息栈
    var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
    prevPage.confirm(this.comment);
    wx.showToast({
      title: '评论成功',
      icon: "success",
      duration: 1000
    })
    wx.navigateBack({
      delta: 1
    })
  },
})