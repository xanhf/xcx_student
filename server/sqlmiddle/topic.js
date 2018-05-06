//题目的详细信息
const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$topic = {};
  ctx.state.$topic.data = data;
  ctx.state.$topic.state = 1;
}
/**
 * 查询题目信息根据qId题库id查第一条
 */
const getFirstTopic = async (ctx, next) => {
  let qid = ctx.request.query["qId"];
  try {
    const data = await mysql("topic").where('qId', qid).limit(1);
    handleData(ctx, data[0]);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};
/**
 *  * 根据topicId查询找当前题目。
 */
const getTopicById = async (ctx, next) => {
  let topicId = ctx.request.query["topicId"];
  try {
    const data = await mysql("topic").where('topicId', topicId);
    handleData(ctx, data[0]);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 根据题库id查询当前题下面的所有题的名字
 */
const getTopicNameByQid = async (ctx, next) => {
  let qId = ctx.request.query["qId"];

  try {
    const data = await mysql("topic").select("title", "topicId","qId").where('qId', qId);
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
  getFirstTopic,
  getTopicById,
  getTopicNameByQid
}
