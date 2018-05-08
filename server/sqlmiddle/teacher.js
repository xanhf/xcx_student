//老师的信息获取

const { cAuth: mysql } = require('./dbconfig.js');

function handleData(ctx, data) {
  ctx.state.$teacher = {};
  ctx.state.$teacher.data = data;
  ctx.state.$teacher.state = 1;
}

/**
 * 根据老师的id获取老师的信息
 */
const getTeacherById = async (ctx, next) => {
  let id = ctx.request.query["tId"];
  try {
    const data = await mysql("teacher").where('id', id);
    handleData(ctx, data[0]);
    await next()//执行下一个中间件
  } catch (e) {
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
};

module.exports = {
  getTeacherById
}