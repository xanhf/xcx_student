var serviceApi = require('../../utils/serviceAPI.js')
Page( {
  data:{
    imgUrls: []
  },
  /**
 * 访问接口获取数据
 */
  getHomeData: function () {
    serviceApi.home().then(res => {
      console.log(res)
      this.data.imgUrls = res.data;
      this.setData({
        imgUrls: this.data.imgUrls
      })
    }).catch(e => {
      console.log(e);
    })
  },

  onShow: function (options) {
    this.getHomeData();
  },
  }
)