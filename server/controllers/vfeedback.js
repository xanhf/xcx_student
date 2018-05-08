/**
 * 视频评论 vfeedback
 * 
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$vfeedback.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$vfeedback.data;
  }
}