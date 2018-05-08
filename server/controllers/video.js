/**
 * 获取推荐数据需要中间件 video teacher 查询结果
 *
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$video.state == 1) {//表示数据获取成功
    let lastData = {};
    lastData.exdata={};
    lastData.videoList = ctx.state.$video.data;//视频信息
    Object.assign(lastData.exdata, ctx.state.$videofoucs.data, ctx.state.$teacherfoucs.data, ctx.state.$vfeedback.data, ctx.state.$teacher.data);
    ctx.state.data = lastData;
  }
}