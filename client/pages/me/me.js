var app = getApp();
Page({
  data: {
    gridList: [
      { enName: 'vhistory', zhName: '视频回看' },
      { enName: 'qhistory', zhName: '答题记录' },
      { enName: 'vip', zhName: '购买纪录' },
      { enName: 'about', zhName: '关于我们' }
    ],
    skin: 'http://img95.699pic.com/photo/50091/3557.jpg_wh860.jpg'
  },
  onReady:function(){
    if (app.globalData.userInfo != null) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo();
    }
  },
  viewGridDetail: function (e) {
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: "../" + data.url + '/' + data.url
    })
  }
})