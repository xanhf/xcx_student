//关注视频以及关注老师， 或者取消关注
const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$teacherfoucs = {};
  ctx.state.$teacherfoucs.data = data;
  ctx.state.$teacherfoucs.state = 1;
}

/**
 * 点赞或者取消关注该老师
 */
const focusT = async (ctx, next) => {
  let parise = ctx.request.query["focus"];
  let uOpenId = ctx.request.query["openId"];
  let qParaId = ctx.request.query["tId"];
  try {
    let data = await mysql("teacherfoucs").where({ 'openId': uOpenId, "tId": qParaId }).limit(1);
    if (data.length > 0) {
      data = await mysql("teacherfoucs").where({ 'openId': uOpenId, "tId": qParaId }).update('foucsT', parise);
    } else {
      data = await mysql("teacherfoucs").insert({ openId: uOpenId, foucsT: parise, tId: qParaId });
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
 * 查询这个用户是否关注该老师
 */
const judgeTFoucs = async (ctx, next) => {
  let uOpenId = ctx.request.query["openId"];
  let qParaId = ctx.request.query["tId"];
  try {
    let data = await mysql("teacherfoucs").select("foucsT").where({ 'openId': uOpenId, "tId": qParaId }).limit(1);
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
  focusT,
  judgeTFoucs
}