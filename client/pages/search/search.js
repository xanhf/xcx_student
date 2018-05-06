// pages/search/search.js
var serviceApi = require('../../utils/serviceAPI.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:["答题","视频"],
    dataList:[],
    select:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.getQClass();
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

  tabChange:function(event){
      this.data.select = event.detail;
      this.setData({
        select: this.data.select
      });
  },

  /**
   * 获取题的类型的数据
   */
  getQClass: function () {
    serviceApi.getQClass().then(res => {
      console.log(res)
      this.data.dataList = res.data;
      this.setData({
        dataList: this.data.dataList
      })
    }).catch(e => {
      console.log(e);
    })
  }
})