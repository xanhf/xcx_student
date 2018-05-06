//用户答题的反馈表
const { cAuth: mysql } = require('./dbconfig.js');

/**
 * 正常返回的数据处理
 */
function handleData(ctx, data) {
  ctx.state.$qfeedback = {};
  ctx.state.$qfeedback.data = data;
  ctx.state.$qfeedback.state = 1;
}

/**
 * 插入用户的答题信息
 */
const insertqfeedbackData = async (ctx, next) => {
  let topic = ctx.request.query["topicId"];
  let qNumId = ctx.request.query["qId"];
  let openid = ctx.request.query["openId"];
  let uChoose = ctx.request.query["choose"];
  let uScore = ctx.request.query["score"];
  try {
    let data = await mysql("qfeedback").where({ 'openId': openid, "qId": qNumId, "topicId": topic });
    if (data.length>0) {
      data = await mysql("qfeedback").where({ 'openId': openid, "qId": qNumId, "topicId": topic }).update({ 'choose': uChoose, 'score':uScore});
    } else {
      data = await mysql("qfeedback").insert({ openId: openid, topicId: topic, qId: qNumId, choose: uChoose, score: uScore});
    }
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
 * 查询当前套题的答题列表 可以分页查询
 */
const checkavgbyqid = async (ctx, next) => {
  let qNumId = ctx.request.query["id"];
  try {
    const dataCount = await mysql("qfeedback").select("openId", "qId").sum('score as scoresum').where("qId", qNumId).groupBy('openId').orderBy("scoresum", 'desc').having('scoresum', '>', 0);
     handleData(ctx, dataCount);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 查询当前用户的当前套题
 * openId
 */
const feedbackResult = async (ctx, next) => {
  let qNumId = ctx.request.query["id"];
  let openId = ctx.request.query["openId"];
  try {
    const dataCount = await mysql("qfeedback").select("qfeedback.choose", "qfeedback.qId", "topic.position", "topic.correct", 'topic.topicId').where({ "qfeedback.qId": qNumId, openId: openId }).leftJoin('topic', 'qfeedback.topicId', 'topic.topicId').orderBy('topic.position', 'asc');
    handleData(ctx, dataCount);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 获取排行榜的接口
 */
const rankList = async (ctx, next) => {
  let qNumId = ctx.request.query["id"];
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  try {
    const dataCount = await mysql("qfeedback").select("qfeedback.openId", "qfeedback.qId", "cSessionInfo.user_info").sum('score as scoresum').where("qfeedback.qId", qNumId).groupBy('qfeedback.openId',"cSessionInfo.user_info").orderBy("scoresum", 'desc').having('scoresum', '>', 0).limit(pageSize).offset(page * pageSize).leftJoin('cSessionInfo', 'qfeedback.openId', 'cSessionInfo.open_id');
    handleData(ctx, dataCount);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 检测这个用户参与的这套题的最后一题的位置
 */
const checkUser = async (ctx, next) => {
  let qNumId = ctx.request.query["id"];
  let openId = ctx.request.query["openId"];
  try {
    const dataCount = await mysql("qfeedback").select("qfeedback.choose", "qfeedback.qId", "topic.position", "topic.correct", 'topic.topicId').where({ "qfeedback.qId": qNumId, openId: openId }).leftJoin('topic', 'qfeedback.topicId', 'topic.topicId').orderBy('topic.position', 'desc').limit(1);
    handleData(ctx, dataCount[0]);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};


module.exports = {
  insertqfeedbackData,
  checkavgbyqid,
  feedbackResult,
  rankList,
  checkUser
}
