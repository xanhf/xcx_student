//用户是否是该题的会员的接口
const { cAuth: mysql} = require('./dbconfig.js');

/**
 * 正常返回的数据处理
 */
function handleData(ctx, data) {
  ctx.state.$members = {};
  ctx.state.$members = data;
  ctx.state.$members.state = 1;
}

/**
 * 查询购买的当前class下的视频列表
 */
const getbuyVlist = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  try {
    const data = await mysql("members").where({ openId: ctx.request.query["openId"], vclassId: ctx.request.query["vclassId"]}).limit(pageSize).offset(page * pageSize).leftJoin('videoclass', 'members.vId', 'videoclass.id');
    handleData(ctx, data);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 查询购买的当前class下的题目列表
 */
const getbuyQlist = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  try {
    const data = await mysql("members").where({ openId: ctx.request.query["openId"], qclassId: ctx.request.query["qclassId"] }).limit(pageSize).offset(page * pageSize).leftJoin('QUESTION', 'members.qId', 'QUESTION.id');
    handleData(ctx, data);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};
/**
 * 查询当前用户购买的视频 
 *
 */
const buyVlist = async (ctx, next) => {
 var openId =  ctx.request.query["openId"];
  try {
    const data = await mysql("members").where('vId', '>', 0, 'openId', openId).leftJoin('videoclass', 'members.vId', 'videoclass.id').select("videoclass.className", "videoclass.classId").count('className as count').groupBy('videoclass.className', "videoclass.classId").orderBy("videoclass.classId", 'desc');
    const clist = [];
    for (var obj of data) {
      let calssNmae = obj.className;
      let count = obj.count;
      let classId = obj.classId;
      let isMore = count > 4;
      const cobj = {
        calssName: calssNmae,
        isMore: isMore,
        classId: classId
      };
      const vList = await mysql("members").where('vclassId', classId).limit(count > 4 ? 4 : count).leftJoin('videoclass', 'members.vId', 'videoclass.id');
      cobj.vList = vList;
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
let countLay = 0;
/**
 * 查询当前用户购买的套题 
 */
const buyTlist = async (ctx, next) => {
  var openId = ctx.request.query["openId"];
  try {
    const data = await mysql("members").where('qId', '>', 0, 'openId', openId).leftJoin('QUESTION', 'members.qId', 'QUESTION.id').select("QUESTION.className", "QUESTION.classId").count('className as count').groupBy("QUESTION.className", "QUESTION.classId").orderBy("QUESTION.classId", 'desc');
    const clist = [];
    for (var obj of data) {
      let calssNmae = obj.className;
      let count = obj.count;
      let classId = obj.classId;
      let isMore = count > 5;
      let layType = countLay % 3;
      countLay++;
      const cobj = {
        calssName: calssNmae,
        isMore: isMore,
        classId: classId,
        layType: layType
      };
      const qList = await mysql("members").where('qclassId', classId).limit(count > 5 ? 5 : count).leftJoin('QUESTION', 'members.qId', 'QUESTION.id');
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
 * 根据当前题的id判断这个用户是否是否购买
 */
const checkBuyQ = async (ctx, next) => {
  try {
    const data = await mysql("members").where({ 'openId': ctx.request.query["openId"], "qId":ctx.request.query["qId"]}).limit(1);
    var myData ={
      isMember:false
    }
    if (data.length>0){
        myData = {
        isMember: data[0].time > Date.now()//标记这个用户是会员没有过期
      }
    }
    handleData(ctx, myData);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 根据视频的id判断这个用户是否购买
 */
const checkBuyV = async (ctx, next) => {
  try {
    const data = await mysql("members").where({ 'openId': ctx.request.query["openId"], "vId":ctx.request.query["vId"]}).limit(1);
    var myData = {
      isMember: false
    }
    if (data.length > 0) {
      myData = {
        isMember: data[0].time > Date.now()//标记这个用户是会员没有过期
      }
    }
    handleData(ctx, myData);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 插入一个购买视频的记录
 */
const buyV = async (ctx, next) => {
  try {
    const data = await mysql("members").insert({ openId: ctx.request.query["openId"], vId: ctx.request.query["vId"], vclassId: ctx.request.query["vclassId"]});
    handleData(ctx, data);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

/**
 * 插入一个购买题的记录
 */
const buyQ = async (ctx, next) => {
  try {
    const data = data = await mysql("members").insert({ openId: ctx.request.query["openId"], qId: ctx.request.query["qId"], qclassId: ctx.request.query["qclassId"] });
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
  buyVlist,
  buyTlist,
  checkBuyQ,
  checkBuyV,
  buyV,
  buyQ,
  getbuyVlist,
  getbuyQlist
}