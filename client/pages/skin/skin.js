Page({
  data:{
    skinList: [{
imgUrl:"http://img95.699pic.com/photo/50091/3112.jpg_wh860.jpg",
      title:"爱在西元前"
    }
    ],
    nowSkin: ''
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res){
        if (res.data == "") {
          that.setData({
            nowSkin: this.data.skinList[0].imgUrl
          })
        } else {
          that.setData({
            nowSkin: res.data
          })
        }
      }
    })
  },
  chooseSkin: function(e) {
    var url = e.currentTarget.dataset.url
    wx.setStorage({
      key: 'skin',
      data: url,
      success: function(res){
        wx.navigateBack({
          delta: 1,
          success: function(res){
            console.log('success')
          }
        })
      }
    })
  }
})