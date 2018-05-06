//用户答题后的反馈数据 ： 用户答题的排名 平均分 最高分 最低分 错题题号和对的题的
/**
 * 用到 表 qfeedback
 * 
 * 用到 qavg 中间件
 */
function handleQresultData(ctx, data) {
  ctx.state.$qresult = data;
}
/**
 * 查找当前的排位
 */
function findArray (array, feature, all = true) {
  let index = -1;
  for (let item of array) {
    ++index;
    if (item.openId == feature.openId){
      return index;
    }
  }
}
module.exports = async (ctx, next) => {
  try {
   const data =  ctx.state.$qavg;
   const feedback = ctx.state.$qfeedback.data;
   let nextData = {};
   if (data.id){
    const index =  findArray(data.dataCount, { openId: ctx.request.query["openId"]});
     data.index = index+1;
     data.score = data.dataCount[index].scoresum;
    delete data.dataCount;
     nextData.data = data;
   }
   nextData.feedback = feedback;
   handleQresultData(ctx, nextData)
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};