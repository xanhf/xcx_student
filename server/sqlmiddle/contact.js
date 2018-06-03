//用户是否是该题的会员的接口
const { cAuth: mysql } = require('./dbconfig.js');

/**
 * 正常返回的数据处理
 */
function handleData(ctx, data) {
  ctx.state.$contact = {};
  ctx.state.$contact = data;
  ctx.state.$contact.state = 1;
}
/**
 * 查询题相关的视频
 */
const getContactV = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  let qId = ctx.request.query["qId"];
  try {
    const data = await mysql("contact").where('qId', qId).limit(pageSize).offset(page * pageSize).leftJoin('videoclass', 'contact.vId', 'videoclass.id');
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
 * 查询视频相关的题
 */
const getContactQ = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  let vId = ctx.request.query["vId"];
  try {
    const data = await mysql("contact").where('vId', vId).limit(pageSize).offset(page * pageSize).leftJoin('QUESTION', 'contact.vId', 'QUESTION.id');
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
  getContactV,
  getContactQ
}