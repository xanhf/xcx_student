/**
 * 插入和查询题目浏览
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$members.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$members.data;
  }
}