/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers');
const qavg = require('../middleUtil/qavg.js');
const qresultm = require('../middleUtil/qresult.js')
const { getData} = require('../sqlmiddle/recommended.js');
const { getClassQestion, getListByClassId, getqDetail} = require('../sqlmiddle/question.js');
const { getqComment, insertComment } = require('../sqlmiddle/qcomment.js');
const { toParise, getjudgePraise } = require('../sqlmiddle/qpraise.js');
const { getFirstTopic, getTopicById, getTopicNameByQid } = require('../sqlmiddle/topic.js');
const { insertqfeedbackData, checkavgbyqid, feedbackResult, rankList, checkUser } = require('../sqlmiddle/qfeedback.js');
// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息 getqDetail
router.post('/message', controllers.message.post)
//首页的推荐接口
router.get('/home', getData,controllers.home)
//获取题的分类的接口
router.get('/questionclass', getClassQestion, controllers.question);
//根据题的分类获取列表的接口
router.get('/questionlist', getListByClassId, controllers.question);
//获取题的详情的接口
router.get('/questionDetail', getjudgePraise, checkavgbyqid, qavg,checkUser,getqDetail, controllers.question);
//获取评论的集合的接口
router.get('/qcommentList', getqComment, controllers.qcomment);
//评论的接口
router.get('/qcomment', insertComment, controllers.qcomment);
//点赞和取消点赞的接口
router.get('/qparise', toParise, controllers.qpraise);
//获取套题的第一道题的接口
router.get('/qftopic', getFirstTopic, controllers.topic);
//获取题的详情根据topicId
router.get('/qtopic', getTopicById, controllers.topic);
//获取当前这套题下面的所有标题信息getTopicNameByQid
router.get('/qtopicnamelist', getTopicNameByQid, controllers.topic);
//答题情况的反馈
router.get('/qfeedback', insertqfeedbackData, controllers.qfeedback);
//拿到答题详情
router.get('/qresult', checkavgbyqid, qavg, feedbackResult, qresultm,controllers.qresult);
//获取排行榜的接口
router.get('/rankList', rankList, controllers.qfeedback);

module.exports = router
