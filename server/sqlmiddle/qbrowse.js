//用户答题的记录表
const { cAuth: mysql } = require('./dbconfig.js');

/**
 * 正常返回的数据处理
 */
function handleData(ctx, data) {
  ctx.state.$qbrowse = {};
  ctx.state.$qbrowse.data = data;
  ctx.state.$qbrowse.state = 1;
}

/**
 * 插入当前用户参与答题的题目
 */
const qbrowse = async (ctx, next) => {
  let uOpenId = ctx.request.query["openId"];
  let qParaId = ctx.request.query["tId"];
  try {
    let data = await mysql("qbrowse").where({ 'openId': uOpenId, "tId": qParaId }).limit(1);
    if (data.length > 0) {
      data = await mysql("qbrowse").where({ 'openId': uOpenId, "tId": qParaId }).update({ time: ctx.request.query["time"], complete:ctx.request.query["complete"]});
    } else {
      data = await mysql("qbrowse").insert({ openId: uOpenId, tId: qParaId, time: ctx.request.query["time"]});
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
 * 获取答题的记录
 */
const getqbrowse = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  try {
    const data = await mysql("qbrowse").where('openId', ctx.request.query["openId"]).limit(pageSize).offset(page * pageSize).leftJoin('QUESTION', 'qbrowse.tId', 'QUESTION.id');
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
  qbrowse,
  getqbrowse
}