// 点击查看视频的页面
var serviceApi = require('../../utils/serviceAPI.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    title:{
      videoList: [],
      select: 1
    },
    exdata:{} 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item);
    this.data.info = item;
    this.videoPnum(item.id);
    this.videoDetial(item.id,item.tId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('video')
    this.commitList = this.selectComponent("#commitList");

    this.setData({
      info: this.data.info,
    });
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
    this.commitList.pullRefresh();
  },
  loadMore:function(e){
    this.commitList.loadMore();
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
   * 关注老师
   */
  foucsT:function(event){
    if (event.currentTarget.dataset.parise == 0) {
      event.currentTarget.dataset.parise = 1;
    } else {
      event.currentTarget.dataset.parise = 0;
    }
    serviceApi.focusT(event.currentTarget.dataset.parise, this.data.title.videoList[0].vId).then(res => {
      //关注老师
      this.data.exdata.foucs = event.currentTarget.dataset.parise;
      this.setData({
        exdata: this.data.exdata
      });
    });
  },
  /**
   * 点赞
   */
  praiseClick:function(event){
    if (event.currentTarget.dataset.parise == 0) {
      event.currentTarget.dataset.parise = 1;
    } else {
      event.currentTarget.dataset.parise = 0;
    }
    serviceApi.focusV(event.currentTarget.dataset.parise, this.data.title.videoList[0].vId).then(res => {
    //点赞
      this.data.exdata.focus = event.currentTarget.dataset.parise;
      this.setData({
        exdata: this.data.exdata
      });
    });
  },
  clickvideo:function(event){
    this.videoContext.pause();
    this.data.title.select = event.currentTarget.dataset.position;
    this.refreshComment(this.data.title.videoList[this.data.title.select - 1].id);
    this.setData({
      title: this.data.title,
      videoUrl: this.data.title.videoList[this.data.title.select - 1].url
    });
  },
/**
 * 评论
 */
  commentClick:function(event){

  },
  /**
   * 更新当前视频的阅读量
   */
  videoPnum:function(id){
    serviceApi.videoPnum(id).then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    })
  },
  /**
   * 获取视频的详情
   */
  videoDetial:function(id,tId){
    serviceApi.videoDetail(id, tId).then(res => {
      this.data.title.videoList = res.data.videoList;
      this.data.exdata = res.data.exdata;
      this.setData({
        exdata: this.data.exdata,
        title: this.data.title,
        videoUrl: this.data.title.videoList[0].url
      });
    }).catch(e => {
      console.log(e);
    })
  },
  /**
   * 刷新评论列表
   */
  refreshComment:function(id){
    this.commitList.setId(id);
    this.commitList.pullRefresh();
  }
})