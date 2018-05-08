//获取关于套题的评论信息
const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$vcomment = {};
  ctx.state.$vcomment.data = data;
  ctx.state.$vcomment.state = 1;
}

/**
 * 通过classId查询评论列表
 */
const getVCommentListById = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  try {
    const data = await mysql("videoComment").where('vId', ctx.request.query["vId"]).limit(pageSize).offset(page * pageSize).orderBy('id', 'desc').leftJoin('cSessionInfo', 'videoComment.openId', 'cSessionInfo.open_id');
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
 * 插入评论数据 
 * 传入 comment评论的内容
 *  openId用户的openId
 *  vId视频的id
 */
const insertVCommentData = async (ctx, next) => {
  let comment = ctx.request.query["comment"];
  let qNumId = ctx.request.query["vId"];
  let openid = ctx.request.query["openId"];
  try {
    const data = await mysql("videoComment").insert({ openId: openid, commentDes: comment, vId: qNumId });
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
  getVCommentListById,
  insertVCommentData
}