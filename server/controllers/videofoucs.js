/**
 * 关注视频需要中间件 videofoucs
 * 
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$videofoucs.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$videofoucs.data;
  }
}