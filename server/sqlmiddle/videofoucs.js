//关注视频以及关注老师， 或者取消关注
const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$videofoucs = {};
  ctx.state.$videofoucs.data = data;
  ctx.state.$videofoucs.state = 1;
}

/**
 * 点赞或者取消点赞
 */
const focusV = async (ctx, next) => {
  let parise = ctx.request.query["focus"];
  let uOpenId = ctx.request.query["openId"];
  let qParaId = ctx.request.query["vId"];
  try {
    let data = await mysql("videofoucs").where({ 'openId': uOpenId, "vId": qParaId }).limit(1);
    if (data.length > 0) {
      data = await mysql("videofoucs").where({ 'openId': uOpenId, "vId": qParaId }).update('focus', parise);
    } else {
      data = await mysql("videofoucs").insert({ openId: uOpenId, focus: parise, vId: qParaId });
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
 * 查询这个用户是否关注
 */
const judgeFoucs = async (ctx, next) => {
  let uOpenId = ctx.request.query["openId"];
  let qParaId = ctx.request.query["id"];
  try {
    let data = await mysql("videofoucs").select("focus").where({ 'openId': uOpenId, "vId": qParaId }).limit(1);
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
  focusV,
  judgeFoucs
}