/**
 * 关注老师需要中间件 teacherfoucs
 * 
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$teacherfoucs.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$teacherfoucs.data;
  }
}