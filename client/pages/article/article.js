// pages/article/article.js 
import WeParser from '../../weparser/weparser.js';
var serviceApi = require('../../utils/serviceAPI.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowTeacher: false,
  exdata: {} 
  },
  /**
   * 关注老师
   */
  foucsT: function (event) {
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
  praiseClick: function (event) {
    if (event.currentTarget.dataset.parise == 0) {
      event.currentTarget.dataset.parise = 1;
    } else {
      event.currentTarget.dataset.parise = 0;
    }
    serviceApi.focusV(event.currentTarget.dataset.parise, this.data.id).then(res => {
      //点赞
      this.data.exdata.focus = event.currentTarget.dataset.parise;
      this.setData({
        exdata: this.data.exdata
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.vid;
    this.data.tId =options.tId;
    this.videoPnum(options.vid)
    serviceApi.getArticleById(options.id, this.data.tId, this.data.id).then(res => {
      this.data.article = res.data;
      this.data.exdata = this.data.article.exdata;
      this.data.text = WeParser('html', this.data.article.text);
      this.setData({
        article: this.data.article,
        exdata: this.data.exdata,
        text: this.data.text
      });
    });
  }
  ,
  /**
   * chakanlaoshi
   */
  viewTeacher: function (event) {
    if (this.data.isShowTeacher) {
      return;
    }
    this.data.isShowTeacher = true;
    this.setData({
      isShowTeacher: this.data.isShowTeacher
    });
  },
  /**
   * 关闭老师信息
   */
  closeT: function (event) {
    this.data.isShowTeacher = false;
    this.setData({
      isShowTeacher: this.data.isShowTeacher
    });
  },

  /**
* 更新当前视频的阅读量
*/
  vbrowse: function (id) {
    serviceApi.vbrowse(id).then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    })
  },
  /**
   * 更新当前视频的阅读量
   */
  videoPnum: function (id) {
    serviceApi.videoPnum(id).then(res => {
      console.log(res);
      this.vbrowse(id);
    }).catch(e => {
      console.log(e);
    })
  },
  /**
   * 跳转到相关的题目页面
   */
  aboutQ:function(event){
    wx.navigateTo({
      url: '../questionList/questionList?vId='+this.data.id+'&isaboutQ=1'
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