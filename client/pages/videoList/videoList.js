// pages/videoList/videoList.js 视频列表的界面 
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
    console.log(options.id);
    this.data.options ={}
    if (options.qId && options.isaboutV){
      this.data.options.qId = options.qId;
    }else{
      this.data.options.isVip = options.isVip;
      this.data.options.id = options.id;
    }
    this.register()
  },
  register: function () {
    if (this.data.options.isVip && this.data.options.isVip == 1) {
      pullToRefresh.regist(this, config.service.getbuyTlist, {
        vclassId: this.data.options.id
      });
    } else if (this.data.options.qId) {
      pullToRefresh.regist(this, config.service.getContactV, {
        qId: this.data.options.qId
      });
    }else{
      pullToRefresh.regist(this, config.service.videolist, {
        classId: this.data.options.id
      });
    }
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
   * 页面上拉触底事件的处理函数 loadMore
   */
  onReachBottom: function () {
    pullToRefresh.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  clickVitem: function (event) {
    var item = event.currentTarget.dataset.item;
    if (item.articleId <= 0) {
      wx.navigateTo({
        url: '../videoDetail/videoDetail?item=' + JSON.stringify(item),
      })
    } else {
      wx.navigateTo({
        url: '../article/article?id=' + item.articleId + "&vid=" + item.id + "&tId=" + item.tId,
      })
    }
  }
})