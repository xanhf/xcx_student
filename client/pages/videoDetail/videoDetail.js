// 点击查看视频的页面
var serviceApi = require('../../utils/serviceAPI.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    titleList:[
      { title: "z哈谁哈斯破发撒地方把草莓，穿"},
      { title: "z哈谁哈斯破发撒地方把草莓，穿"},
      { title: "z哈谁哈斯破发撒地方把草莓，穿" },
      { title: "z哈谁哈斯破发撒地方把草莓，穿" }, 
      { title: "z哈谁哈斯破发撒地方把草莓，穿" },
      { title: "z哈谁哈斯破发撒地方把草莓，穿" }, 
      { title: "z哈谁哈斯破发撒地方把草莓，穿" },
      { title: "z哈谁哈斯破发撒地方把草莓，穿" }
    ],
    select:1
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
    this.commitList = this.selectComponent("#commitList");
    this.commitList.setId(5);
    this.commitList.pullRefresh();
    this.setData({
      info: this.data.info
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