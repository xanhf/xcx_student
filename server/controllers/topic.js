/**
 * 获取推荐数据需要中间件 topic
 *  qDetails
 * 根据数据库返回的数据做具体的逻辑
 */
module.exports = async (ctx, next) => {
  if (ctx.state.$topic.state == 1) {//表示数据获取成功
    ctx.state.data ={};
    ctx.state.data.topic = ctx.state.$topic.data;
    ctx.state.data.qDetails = ctx.state.$qDetails.data;
  }
}