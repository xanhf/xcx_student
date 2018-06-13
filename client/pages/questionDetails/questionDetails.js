// pages/questionDetails/questionDetails.js 考卷的细节页面 
var serviceApi = require('../../utils/serviceAPI.js');
Page({
  

    /**
   * 页面的初始数据
   */
  data: {
    qDetai:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.commitId = options.id;
    this.getQDetail(options.id);
    this.qbrowse(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成 pullRefresh
   */
  onReady: function () {
    this.commitList = this.selectComponent("#commitList");
    this.commitList.setId(this.commitId);
    this.commitList.pullRefresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.hinde) {
      this.commitList.setId(this.commitId);
    }
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
    this.commitList.pullRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.commitList.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 获取问题的详情
   */
  getQDetail:function(id){
    serviceApi.getQDetail(id).then(res=>{
      this.data.qDetai = res.data;
      this.setData({
        qDetai: this.data.qDetai
      });
    });
  },
  /**
   * 浏览记录
   */
  qbrowse: function (id) {
    serviceApi.qbrowse(id,0).then(res => {
    });
  },
  /**
   * 点赞或者取消点赞
   */
  praiseClick:function(event){
    console.log(event);
    if (event.currentTarget.dataset.parise==0){
      event.currentTarget.dataset.parise=1;
    }else{
      event.currentTarget.dataset.parise = 0;
    }
    serviceApi.qParise(event.currentTarget.dataset.id, event.currentTarget.dataset.parise).then(res => {
      this.data.qDetai.isParise = event.currentTarget.dataset.parise;
      this.setData({
        qDetai: this.data.qDetai
      });
    });
  },
  /**
   * 评论
   */
  commentClick:function(event){
    wx.navigateTo({
      url: '../comment/comment?id=' + this.data.qDetai.id + "&type=question"
    });
  },
  /**
   * 开始答题 
   */
  startQuestion:function(event){
    wx.navigateTo({
      url: '../answer/answer?isFirst=true&qId=' + this.data.qDetai.id
    });
  },
  inputListener:function(inputData){
    this.data.commentText = inputData.detail.value;
  },
  /**
   * 评论成功
   */
  confirm: function (commentText){
    this.commitList.addNewComment(commentText);
  },


})