// pages/article/article.js 
import WeParser from '../../weparser/weparser.js';
var serviceApi = require('../../utils/serviceAPI.js')
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
    this.videoPnum(options.vid)
    serviceApi.getArticleById(options.id).then(res => {
      this.data.article = res.data[0];
      this.data.text = WeParser('html', this.data.article.text);
      this.setData({
        article: this.data.article,
        text: this.data.text
      });
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