//处理查询到的套题排名信息 删选出平均值  最高分 最低分 id为套题的id
//返回下一个中间件的数据
/**
 * 用到 表 qfeedback
 * checkavgbyqid 中间件
 */
function handleAvgData(ctx, data) {
  ctx.state.$qavg = data;
}
module.exports  = async (ctx, next) => {
  let qNumId = ctx.request.query["id"];
  try {
    const dataCount = ctx.state.$qfeedback.data;
    let lenght = dataCount.length;
    if (lenght > 0) {
      let highest = dataCount[0].scoresum;
      let lowest = dataCount[dataCount.length - 1].scoresum;
      const sum = dataCount.reduce(function (pre, cur) {
        return cur.scoresum + pre
      }, 0
      );
      let data = {
        id: qNumId,
        avg: sum / lenght,
        pnum: lenght,
        highest: highest,
        lowest: lowest,
        dataCount: dataCount
      }
      handleAvgData(ctx, data);
    } else {
      handleAvgData(ctx, {});
    }
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};