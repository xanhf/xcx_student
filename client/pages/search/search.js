// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:["答题","视频"],
    cList:[
     {
        layType:2,
        id: "xxx",
        calssName:"邵先生",
        isMore:true,
        qList: [
          {
            images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
            title: "张三家的傻孩子",
            des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
            autho: "站衫",
            id: "wwwww"
          }, {
            images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
            title: "张三家的傻孩子",
            des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
            autho: "站衫",
            id: "wwwww"
          }, {
            images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
            title: "张三家的傻孩子",
            des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
            autho: "站衫",
            id: "wwwww"
          }, {
            images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
            title: "张三家的傻孩子",
            des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
            autho: "站衫",
            id: "wwwww"
          }, {
            images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
            title: "张三家的傻孩子",
            des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
            autho: "站衫",
            id: "wwwww"
          }, {
            images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
            title: "张三家的傻孩子",
            des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
            autho: "站衫",
            id: "wwwww"
          }, {
            images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
            title: "张三家的傻孩子",
            des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
            autho: "站衫",
            id: "wwwww"
          }
        ]
     },
     {
       layType: 0,
       id: "xxx",
       calssName: "类先生",
       isMore: true,
       qList: [
         {
           images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
           title: "张三家的傻孩子",
           des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
           autho: "站衫",
           id: "wwwww"
         }
       ]
     }, {
       layType: 1,
       id: "xxx",
       calssName: "类先生",
       isMore: true,
       qList: [
         {
           images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
           title: "张三家的傻孩子",
           des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
           autho: "站衫",
           id: "wwwww"
         }, {
           images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
           title: "张三家的傻孩子",
           des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
           autho: "站衫",
           id: "wwwww"
         }, {
           images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
           title: "张三家的傻孩子",
           des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
           autho: "站衫",
           id: "wwwww"
         }, {
           images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
           title: "张三家的傻孩子",
           des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
           autho: "站衫",
           id: "wwwww"
         }, {
           images: "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
           title: "张三家的傻孩子",
           des: "锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制锄禾日当午，汗滴禾下土,是遏制",
           autho: "站衫",
           id: "wwwww"
         }
       ]
     }
    ],
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