/**
 * 获取推荐数据需要中间件 qpraise
 * 
 * 根据数据库返回的数据做具体的逻辑
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$qpraise.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$qpraise.data;
  }
}