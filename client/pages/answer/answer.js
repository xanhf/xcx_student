// pages/answer/answer.js.  答题的页面
var serviceApi = require('../../utils/serviceAPI.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
  },

  /**
   * 单选选择完成
   */
  choose: function (e) {
    this.data.choose = e.currentTarget.dataset.name;
    this.setData({
      choose: this.data.choose
    });
  },
  /**
   * 多选 position
   */
  multiChoose: function (e){
    let item = this.data.items[e.currentTarget.dataset.position];
    if (item.choose && item.choose==1){
      item.choose=0;
    }else{
      item.choose=1;
    }
    this.setData({
      items: this.data.items
    });
  },
  /**
   * 点击进入下一题
   */
  nextAnswer:function(e){
    this.checkChoose();
    //先判断是否选择
    if (this.data.choose) {//已经选择 qfeedback
      this.next();
    }else{
      wx.showToast({
        title: '请做出您的选择',
        icon:'none',
        duration:1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载 qId topicId
   */
  onLoad: function (options) {
    if (options.isFirst){
      this.qftopic(options.qId);
    }else{
      this.qtopic(options.topicId);
    }
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

  },
  /**
   *     //获取第一道题 qftopic qId
        qftopic: `${host}/weapp/qftopic`,
        //获取下一道题 qtopic topicId
        qtopic: `${host}/weapp/qtopic`,
   * 获取第一道提
   * 
   * {"topicId":1,"title":"什么是中国下面介绍","a":"是只是大披萨的","b":"ask的发丝的","c":"节哀哦大家啊","d":"觉得是佛佛就","correct":"a","nextId":6,"score":10,"qId":5,"durationTime":"25","position":1}}
   */
  qftopic: function (qId){
    wx.showLoading({
      title: '正在加载请稍后...',
    })
    serviceApi.qftopic(qId).then(res => {
      this.handlerData(res);
    });
  },

  /**
   * 获取下一道提
   */
  qtopic: function (topicId){
    wx.showLoading({
      title: '正在加载请稍后...',
    })
    serviceApi.qtopic(topicId).then(res => {
      this.handlerData(res);
    });
},

  /**
   * 处理数据
   */
  handlerData: function (res) {
    wx.hideLoading();
    this.data.res = res.data.topic;
    this.data.items = [];
    this.data.title = res.data.topic.title;
    this.data.position = res.data.topic.position;
    this.data.items = res.data.qDetails;
    let title={
      title: '单项选择'
    };
    if (this.data.res.tType==1){
      title.title="多项选择"
    }
    wx.setNavigationBarTitle(title)
    this.setData({
      items: this.data.items,
      title: this.data.title,
      position: this.data.position,
      multi: this.data.res.tType == 1
    });
  },

  /**
   * 提交答题情况  topicId, qId, choose, score
   */
  next:function(){
    let score = this.data.choose == this.data.res.correct ? this.data.res.score:0;
    serviceApi.qfeedback(this.data.res.topicId, this.data.res.qId, this.data.choose, score).then(res => {
      if (this.data.res.nextId) {//说明有下一题
        wx.redirectTo({
          url: './answer?topicId=' + this.data.res.nextId
        })
      } else {//说明没有下一题
        wx.redirectTo({
          url: '../answerResult/answerResult?qId=' + this.data.res.qId
        })
      }
    });
  },
  checkChoose:function(){
    if (this.data.res.tType == 1){
      this.data.choose=false;
      for(var item of this.data.items){
       if(item.choose&&item.choose==1){
         this.data.choose += item.value;
       }
      };
    }
  }

})