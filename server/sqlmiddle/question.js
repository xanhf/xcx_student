//获取题的封面信息
const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$question = {};
  ctx.state.$question.data = data;
  ctx.state.$question.state = 1;
}

let countLay = 0;
/**
 * 获取表的数据get请求:
 */
const getQuestiondata = async (ctx, next) => {
  try {
    const data = await mysql("QUESTION").select("className", "classId").count('className as count').groupBy('className',"classId");
    const clist=[];
    for (var obj of data){
      let calssNmae = obj.className;
      let count = obj.count;
      let classId = obj.classId;
      let isMore = count>5;
      let layType = countLay%3;
      countLay++;
      const cobj={
        calssName: calssNmae,
        isMore: isMore,
        classId: classId,
        layType: layType
      };
      const qList = await mysql("QUESTION").where('className', calssNmae).limit(count>5?5:count);
        cobj.qList = qList;
      clist.push(cobj);
    }
    handleData(ctx, clist);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 通过classId查询题目列表
 */
const getQListById = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  try{
    const data = await mysql("QUESTION").where('classId', ctx.request.query["classId"]).limit(pageSize).offset(page * pageSize)
    handleData(ctx, data);
    await next()//执行下一个中间件
  }catch(e){
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 根据id获取题目的基础信息
 */
const getQDet = async (ctx, next) => {
  try {
    let question = ctx.state.$qavg;//拿到上一个中间件的数据。答题的人数 ,平均分，题的id
    if (question.id){//说明存在则删除datacount列表不必要传到客户端
      delete question.dataCount
    }
    let data = await mysql("QUESTION").where('id', ctx.request.query["id"]);
    let cons = Object.assign(data[0], question, ctx.state.$qpraise.data, ctx.state.$qfeedback.data);
    handleData(ctx, cons);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

module.exports = {
  getClassQestion: getQuestiondata,
  getListByClassId: getQListById,
  getqDetail: getQDet
}