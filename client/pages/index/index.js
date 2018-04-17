var config = require('../../config')
Page( {
  data:{
    imgUrls: [
'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },
  onShow: function (options) {
    // Do something when show.
    getApp().globalData.wxAPI.getRequest(`${config.service.host}/weapp/demo`).then(res => { 
      console.log(res)
    }).catch(e => {
      console.log(e);
    })  
  }
  }
)