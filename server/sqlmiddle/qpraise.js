//获取关于套题的点赞信息
const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$qpraise = {};
  ctx.state.$qpraise.data = data;
  ctx.state.$qpraise.state = 1;
}

/**
 * 点赞或者取消点赞
 */
const parise = async (ctx, next) => {
  let parise = ctx.request.query["parise"];
  let uOpenId = ctx.request.query["openId"];
  let qParaId = ctx.request.query["qId"];
  try {
    let data = await mysql("qParise").where({ 'openId': uOpenId, "qId": qParaId }).limit(1);
    if (data.length>0){
      data =   await mysql("qParise").where({ 'openId': uOpenId, "qId": qParaId }).update('isParise', parise);
    }else{
      data =  await mysql("qParise").insert({ openId: uOpenId, isParise: parise, qId: qParaId });
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
 * 查询这个用户是否点赞
 */
const judgePraise = async (ctx, next) =>{
  let uOpenId = ctx.request.query["openId"];
  let qParaId = ctx.request.query["id"];
  try {
    let data = await mysql("qParise").select("isParise").where({ 'openId': uOpenId, "qId": qParaId}).limit(1);
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
  toParise: parise,
  getjudgePraise: judgePraise
}