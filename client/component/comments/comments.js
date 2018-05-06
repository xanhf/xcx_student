// component/comments/comments.js 评论的组件
var pullToRefresh = require('../../utils/pullToRefresh.js')
var { config } = require('../../config.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    u_type:{
      type:String,
      value:"question"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 设置参数
     */
    setId:function(id){
      pullToRefresh.regist(this, config.service.qCommentList, {
        qId: id
      });
    },
    /**
     * 刷新的方法
     */
    pullRefresh:function(){
      pullToRefresh.pullRefresh();
    },
    /**
     * 加载更多的方法 addNewComment
     */
    loadMore:function(){
      pullToRefresh.loadMore();
    },
    /**
     * 添加新的评论的方法
     */
    addNewComment:function(commentText){
      pullToRefresh.addNewData({
        commentDes: commentText,
        openId: getApp().globalData.openId,
        user_info: getApp().globalData.userInfo
      });
    }
  }
})
