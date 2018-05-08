//视频分类列表
const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$videoclass = {};
  ctx.state.$videoclass.data = data;
  ctx.state.$videoclass.state = 1;
}

/**
 * 获取表的数据get请求:
 */
const getVideoclassdata = async (ctx, next) => {
  try {
    const data = await mysql("videoclass").select("className", "classId").count('className as count').groupBy('className', "classId");
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
      const vList = await mysql("videoclass").where('className', calssNmae).limit(count > 4 ? 4 : count);
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

/**
 * 通过classId查询题目列表
 */
const getVListById = async (ctx, next) => {
  let page = ctx.request.query["page"];
  let pageSize = ctx.request.query["pageSize"];
  try {
    const data = await mysql("videoclass").where('classId', ctx.request.query["classId"]).limit(pageSize).offset(page * pageSize)
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
 * 更新观看人数
 */
const pnum = async (ctx, next) => {
  let id = ctx.request.query["id"];
  try {
    let old = await mysql("videoclass").where({"id": id}).limit(1);
    if (old.length > 0) {
      let data = await mysql("videoclass").where({ "id": id }).update('pnum', old[0].pnum+1);
     handleData(ctx, data);
    } 
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

module.exports = {
  getVideoclassdata,
  getVListById,
  pnum
}