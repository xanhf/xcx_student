//用户答题对应的答题信息表
const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$qDetails = {};
  ctx.state.$qDetails.data = data;
  ctx.state.$qDetails.state = 1;
}

/**
 * 查询题目第一条信息
 */
const getFirstQDetail = async (ctx, next) => {
  let topicId = ctx.state.$topic.data.topicId;
  try {
    const data = await mysql("qDetails").where('topicId', topicId);
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
 * 查询topic下面的具体的题目信息
 */
const getDetailsById = async (ctx, next) => {
  let topicId = ctx.request.query["topicId"];
  try {
    const data = await mysql("qDetails").where('topicId', topicId);
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
  getFirstQDetail,
  getDetailsById
}