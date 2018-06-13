/**
 * 获取联系相关的视频和题目 article
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$article.state == 1) {//表示数据获取成功
    let lastData = {};
    lastData = ctx.state.$article[0];
    lastData.exdata = {};
    Object.assign(lastData.exdata, ctx.state.$videofoucs.data, ctx.state.$teacherfoucs.data,ctx.state.$teacher.data);
    ctx.state.data = lastData;
  }
}