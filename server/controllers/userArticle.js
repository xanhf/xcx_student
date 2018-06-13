/**
 * 获取用户相关的文章的信息需要中间件 userArticle
 * 
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$userArticle.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$userArticle;
  }
}