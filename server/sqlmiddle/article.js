//关于文章的展示接口
const { cAuth: mysql } = require('./dbconfig.js');

/**
 * 正常返回的数据处理
 */
function handleData(ctx, data) {
  ctx.state.$article = {};
  ctx.state.$article = data;
  ctx.state.$article.state = 1;
}

/**
 * 查询article下面的具体的题目信息
 */
const getArticleById = async (ctx, next) => {
  let articleId = ctx.request.query["articleId"];
  try {
    const data = await mysql("article").where('id', articleId);
    handleData(ctx, data);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

module.exports = {
  getArticleById
}