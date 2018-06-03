/**
 * 插入和查询视频浏览
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$vbrowse.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$vbrowse.data;
  }
}