// 点击查看视频的页面
var serviceApi = require('../../utils/serviceAPI.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowTeacher:false,
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
    this.refreshComment();
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
    this.videoContext.pause();
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
    if (event.currentTarget.dataset.foucst == 0) {
      event.currentTarget.dataset.foucst = 1;
    } else {
      event.currentTarget.dataset.foucst = 0;
    }
    serviceApi.focusT(event.currentTarget.dataset.foucst, this.data.exdata.id).then(res => {
      //关注老师
      this.data.exdata.foucsT = event.currentTarget.dataset.foucst;
      this.data.isShowTeacher = false;
      this.setData({
        exdata: this.data.exdata,
        isShowTeacher: this.data.isShowTeacher
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
  /**
   * 点击选集
   */
  clickvideo:function(event){
    if (this.data.title.select == event.currentTarget.dataset.position){
      return;
    }
    this.videoContext.pause();
    this.data.title.select = event.currentTarget.dataset.position;
    this.refreshComment();
    this.setData({
      title: this.data.title,
      videoUrl: this.data.title.videoList[this.data.title.select - 1].url
    });
  },
/**
 * 评论 url: '../answerRank/answerRank?id=' + this.data.qId
 */
  commentClick:function(event){
    wx.navigateTo({
      url: '../comment/comment?id=' + this.data.title.videoList[this.data.title.select - 1].id+"&type=video"
    });
  },
  /**
   * 评论成功
   */
  confirm: function (commentText) {
    this.commitList.addNewComment(commentText);
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
      this.refreshComment();
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
  refreshComment:function(){
    if (!this.commitList){
        return;
    }
    if (this.data.title.videoList.length<=0){
        return;
    }
    this.commitList.setId(this.data.title.videoList[this.data.title.select - 1].id);
    this.commitList.pullRefresh();
  },
  /**
   * chakanlaoshi
   */
  viewTeacher:function(event){
    if (this.data.isShowTeacher){
      return;
    }
    this.data.isShowTeacher=true;
    this.setData({
      isShowTeacher: this.data.isShowTeacher
    });
  },
  /**
   * 关闭老师信息
   */
  closeT:function(event){
    this.data.isShowTeacher = false;
    this.setData({
      isShowTeacher: this.data.isShowTeacher
    });
  }
})