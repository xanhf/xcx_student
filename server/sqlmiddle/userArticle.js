//用户参与读书的表
const { cAuth: mysql } = require('./dbconfig.js');

/**
 * 正常返回的数据处理
 */
function handleData(ctx, data) {
  ctx.state.$userArticle = {};
  ctx.state.$userArticle = data;
  ctx.state.$userArticle.state = 1;
}

/**
 * 插入用户的录音资料
 */
const insertUser = async (ctx, next) => {
  try {
    const data = await mysql("userArticle").insert({ openId: ctx.request.query["openId"], vId: ctx.request.query["vId"], vclassId: ctx.request.query["vclassId"] });
    handleData(ctx, data);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 查询用户参与读的文章
 */
const getUserAriticle = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  let openId = ctx.request.query["openId"];
  try {
    const data = await mysql("userArticle").where('openId', openId).limit(pageSize).offset(page * pageSize).leftJoin('article', 'userArticle.aId', 'article.id');
    handleData(ctx, data);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 根据文章的id和用户id查询当前用户有没有参与读
 */
const checkUserIsRead = async (ctx, next) => {
  let id = ctx.request.query["id"];
  let openId = ctx.request.query["openId"];
  try {
    const data = await mysql("userArticle").where('openId', openId,"aId",id).limit(1);
    handleData(ctx, data[0]);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

module.exports = {
  insertUser,
  getUserAriticle,
  checkUserIsRead
}

