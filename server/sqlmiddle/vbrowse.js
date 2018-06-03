//用户答题的记录表
const { cAuth: mysql, knex: knex } = require('./dbconfig.js');

/**
 * 正常返回的数据处理
 */
function handleData(ctx, data) {
  ctx.state.$vbrowse = {};
  ctx.state.$vbrowse.data = data;
  ctx.state.$vbrowse.state = 1;
}

/**
 * 插入当前用户观看的视频
 */
const vbrowse = async (ctx, next) => {
  let uOpenId = ctx.request.query["openId"];
  let qParaId = ctx.request.query["vId"];
  try {
    let data = await mysql("vbrowse").where({ 'openId': uOpenId, "vId": qParaId }).limit(1);
    if (data.length > 0) {
      data = await mysql("vbrowse").where({ 'openId': uOpenId, "vId": qParaId }).update('time', ctx.request.query["time"]);
    } else {
      data = await mysql("vbrowse").insert({ openId: uOpenId, vId: qParaId, time: ctx.request.query["time"]});
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
 * 获取观看视频的记录
 */
const getvbrowse = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  try {
    const data = await mysql("vbrowse").where('openId', ctx.request.query["openId"]).limit(pageSize).offset(page * pageSize).leftJoin('videoclass', 'vbrowse.vId', 'videoclass.id');
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
  vbrowse,
  getvbrowse
}