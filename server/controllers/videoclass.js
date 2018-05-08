/**
 * 获取推荐数据需要中间件 videoclass 查询结果
 *
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$videoclass.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$videoclass.data;
  }
}