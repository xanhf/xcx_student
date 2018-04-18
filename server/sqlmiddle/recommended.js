const { cAuth: mysql }  = require('./dbconfig.js');
//获取推荐表中数据的中间件
/**
 * 将数据封装传到下个中间件
 */
function handleData(ctx, data){
  ctx.state.$recommended = {};
  ctx.state.$recommended.data = data;
  ctx.state.$recommended.state = 1;
}
/**
 * 获取表的数据get请求：
 * u_type参数根据类型返回不通的推广信息
 */
const getRecommenddata=async(ctx,next)=>{
  try{
    const data = await mysql("recommended").where('type', ctx.request.query["u_type"])
    handleData(ctx, data);
    await next()//执行下一个中间件
  }catch(e){
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
}

module.exports={
  getData: getRecommenddata
}