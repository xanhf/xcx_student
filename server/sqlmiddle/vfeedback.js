//用户答题的反馈表
const { cAuth: mysql } = require('./dbconfig.js');

/**
 * 正常返回的数据处理
 */
function handleData(ctx, data) {
  ctx.state.$vfeedback = {};
  ctx.state.$vfeedback.data = data;
  ctx.state.$vfeedback.state = 1;
}

/**
 * 插入用户的观看信息
 */
const insertvfeedbackData = async (ctx, next) => {
  let topic = ctx.request.query["vId"];
  let qNumId = ctx.request.query["vCId"];
  let openid = ctx.request.query["openId"];
  let progress  = ctx.request.query["progress"];
  try {
    let data = await mysql("vfeedback").where({ 'openId': openid, "vCId": qNumId, "vId": topic });
    if (data.length > 0) {
      data = await mysql("vfeedback").where({ 'openId': openid, "vCId": qNumId, "vId": topic }).update({ 'progress': progress});
    } else {
      data = await mysql("vfeedback").insert({ openId: openid, vId: topic, vCId: qNumId, progress: progress});
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
 * 查询用户观看这期视频的进度
 * openId
 */
const feedbackVList = async (ctx, next) => {
  let qNumId = ctx.request.query["id"];
  let openId = ctx.request.query["openId"];
  try {
    const dataCount = await mysql("vfeedback").select("vfeedback.progress", "vfeedback.vId", "vfeedback.vCId", "video.position", "video.title",'video.id').where({ "vfeedback.vCId": qNumId, openId: openId }).leftJoin('video', 'vfeedback.vId', 'video.id').orderBy('video.position', 'asc');
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
 * 检测这个用户参与这套视频的最后一题的位置
 */
const checkUserLastPostion = async (ctx, next) => {
  let qNumId = ctx.request.query["id"];
  let openId = ctx.request.query["openId"];
  try {
    const dataCount = await mysql("vfeedback").select("vfeedback.progress", "vfeedback.vId", "vfeedback.vCId", "video.position", "video.title", 'video.id').where({ "vfeedback.vCId": qNumId, openId: openId }).leftJoin('video', 'vfeedback.vId', 'video.id').orderBy('video.position', 'desc').limit(1);
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
  insertvfeedbackData,
  feedbackVList,
  checkUserLastPostion
}
