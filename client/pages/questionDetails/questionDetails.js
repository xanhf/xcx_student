// pages/questionDetails/questionDetails.js 考卷的细节页面
var serviceApi = require('../../utils/serviceAPI.js');
Page({
  

    /**
   * 页面的初始数据
   */
  data: {
    qDetai:{},
    commentModal:{
      title:"评论",
      confirm:"确认",
      cancel:"取消",
      placeholder:"请输入内容",
      hiddenmodalput:true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.commitId = options.id;
    this.getQDetail(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成 pullRefresh
   */
  onReady: function () {
    this.commitList = this.selectComponent("#commitList");
    this.commitList.setId(this.commitId);
    this.commitList.pullRefresh();
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
    this.commitList.pullRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.commitList.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 获取问题的详情
   */
  getQDetail:function(id){
    serviceApi.getQDetail(id).then(res=>{
      this.data.qDetai = res.data;
      this.setData({
        qDetai: this.data.qDetai
      });
    });
  },
  /**
   * 点赞或者取消点赞
   */
  praiseClick:function(event){
    console.log(event);
    if (event.currentTarget.dataset.parise==0){
      event.currentTarget.dataset.parise=1;
    }else{
      event.currentTarget.dataset.parise = 0;
    }
    serviceApi.qParise(event.currentTarget.dataset.id, event.currentTarget.dataset.parise).then(res => {
      this.data.qDetai.isParise = event.currentTarget.dataset.parise;
      this.setData({
        qDetai: this.data.qDetai
      });
    });
  },
  /**
   * 评论
   */
  commentClick:function(event){
    this.data.commentModal.hiddenmodalput = false;
    this.setData({
      commentModal: this.data.commentModal
    });
  },
  /**
   * 开始答题 
   */
  startQuestion:function(event){
    wx.navigateTo({
      url: '../answer/answer?isFirst=true&qId=' + this.data.qDetai.id
    });
  },
  inputListener:function(inputData){
    this.data.commentText = inputData.detail.value;
  },
  /**
   * 确认评论
   */
  confirm:function(event){
    if (this.data.commentText){
      this.data.commentModal.hiddenmodalput = true;
      this.setData({
        commentModal: this.data.commentModal
      });
      serviceApi.qComment(this.data.qDetai.id, this.data.commentText).then(res => {
        this.commitList.addNewComment(this.data.commentText);
        wx.showToast({
          title: '评论成功',
          icon: "success",
          duration: 1000
        })
      });
    }else{
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none',
        duration: 1000
      })
    }
  },
  /**
   * 取消评论
   */
  cancel:function(event){
    console.log(event);
    this.data.commentModal.hiddenmodalput = true;
    this.setData({
      commentModal: this.data.commentModal
    });
  }

})