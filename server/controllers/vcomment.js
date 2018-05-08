/**
 * 视频评论 vcomment
 * 
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$vcomment.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$vcomment.data;
  }
}