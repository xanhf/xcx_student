/**
 * 获取推荐数据需要中间件 qresult 查询结果
 * 
 * 获取用户答题后的结果统计
 */
module.exports = async (ctx, next) => {
  ctx.state.data = ctx.state.$qresult;
}