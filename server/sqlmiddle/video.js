//视频数据的获取

const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$video = {};
  ctx.state.$video.data = data;
  ctx.state.$video.state = 1;
}

/**
 * 根据视频的id获取当前期下面的所有视频
 */
const getVideoByVid = async (ctx, next) => {
  let vId = ctx.request.query["id"];
  try {
    const data = await mysql("video").where('vId', vId).orderBy('position', 'asc');
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
  getVideoByVid
}