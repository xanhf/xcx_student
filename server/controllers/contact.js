/**
 * 获取联系相关的视频和题目 contact
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$contact.state == 1) {//表示数据获取成功
    ctx.state.data = ctx.state.$contact;
  }
}