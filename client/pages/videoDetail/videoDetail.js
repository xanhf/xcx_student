// 点击查看视频的页面
var serviceApi = require('../../utils/serviceAPI.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    title:{
      titleList: [
        { title: "z哈谁哈斯破发撒地方把草莓，穿", position: 1, videoUrl:"http://qiniu-xpc3.vmoviercdn.com/5aee6d1e0aaf5.mp4"},
        { title: "z哈谁哈斯破发撒地方把草莓，穿", position: 2, videoUrl: "http://qiniu-xpc3.vmoviercdn.com/5aee6d1e0aaf5.mp4"},
        { title: "z哈谁哈斯破发撒地方把草莓，穿", position: 3, videoUrl: "http://qiniu-xpc3.vmoviercdn.com/5aee6d1e0aaf5.mp4"},
        { title: "z哈谁哈斯破发撒地方把草莓，穿", position: 4, videoUrl: "http://qiniu-video5.vmoviercdn.com/5aed424a36f24.mp4"},
        { title: "z哈谁哈斯破发撒地方把草莓，穿", position: 5, videoUrl: "http://qiniu-video5.vmoviercdn.com/5aed424a36f24.mp4"},
        { title: "z哈谁哈斯破发撒地方把草莓，穿", position: 6, videoUrl: "http://qiniu-video5.vmoviercdn.com/5aed424a36f24.mp4"},
        { title: "z哈谁哈斯破发撒地方把草莓，穿", position: 7, videoUrl: "http://qiniu-video5.vmoviercdn.com/5aed424a36f24.mp4"},
        { title: "z哈谁哈斯破发撒地方把草莓，穿", position: 8, videoUrl: "http://qiniu-xpc3.vmoviercdn.com/5aee6d1e0aaf5.mp4"}
      ],
      select: 1
    },

   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item);
    this.data.info = item;
    this.videoPnum(item.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('video')
    this.commitList = this.selectComponent("#commitList");
    this.commitList.setId(5);
    this.commitList.pullRefresh();
    this.setData({
      info: this.data.info,
      videoUrl: this.data.title.titleList[0].videoUrl
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
   * 点赞
   */
  praiseClick:function(event){

  },
  clickvideo:function(event){
    this.videoContext.pause();
    this.data.title.select = event.currentTarget.dataset.position;
    this.setData({
      title: this.data.title,
      videoUrl: this.data.title.titleList[this.data.title.select-1].videoUrl
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
  }
})