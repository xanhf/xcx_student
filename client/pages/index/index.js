var serviceApi = require('../../utils/serviceAPI.js')
Page( {
  data:{
    imgUrls: []
  },
  onShow: function (options) {
    serviceApi.home().then(res => { 
      console.log(res)
      this.data.imgUrls =res.data;
      this.setData({
        imgUrls: this.data.imgUrls
      })
    }).catch(e => {
      console.log(e);
    })  
  }
  }
)