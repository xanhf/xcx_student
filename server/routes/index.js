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
const { getFirstQDetail, getDetailsById } = require('../sqlmiddle/qdetails.js');
const { insertqfeedbackData, checkavgbyqid, feedbackResult, rankList, checkUser } = require('../sqlmiddle/qfeedback.js');

/**
 * 视频相关
 */
const { getVideoclassdata,
  getVListById,
  pnum } = require('../sqlmiddle/videoclass.js');
const { getVideoByVid } = require('../sqlmiddle/video.js');
const { getTeacherById } = require('../sqlmiddle/teacher.js');
const { insertvfeedbackData,
  feedbackVList,//获取反馈列表（待定）
  checkUserLastPostion } = require('../sqlmiddle/vfeedback.js');
const { focusT,
  judgeTFoucs } = require('../sqlmiddle/teacherfoucs.js');
const { focusV,
  judgeFoucs } = require('../sqlmiddle/videofoucs.js');

const { getVCommentListById,
  insertVCommentData } = require('../sqlmiddle/vcomment.js');

/**
 * 我的相关, 视频和题目总汇
 */
//视频和题相关联的接口
const {getContactV,
  getContactQ} = require("../sqlmiddle/contact.js");
//会员相关
const {
  buyVlist,
  buyTlist,
  checkBuyQ,
  checkBuyV,
  buyV,
  buyQ,
  getbuyVlist,
  getbuyQlist
}= require("../sqlmiddle/members.js");
//答题记录
const {
  qbrowse,
  getqbrowse
} = require("../sqlmiddle/qbrowse.js");
//视频浏览记录相关
const {
  vbrowse,
  getvbrowse
} = require("../sqlmiddle/vbrowse.js");

//文章相关
const {
  getUserArticle,
  getArticleById
} = require("../sqlmiddle/article.js");

//用户上传的文章相关 
const {
  insertUser,
  getUserAriticle,
  checkUserIsRead
} = require("../sqlmiddle/userArticle.js");


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
/**
 * 答题相关
 */
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
router.get('/qftopic', getFirstTopic, getFirstQDetail, controllers.topic);
//获取题的详情根据topicId
router.get('/qtopic', getTopicById, getDetailsById,controllers.topic);
//获取当前这套题下面的所有标题信息getTopicNameByQid
router.get('/qtopicnamelist', getTopicNameByQid, controllers.topic);
//答题情况的反馈
router.get('/qfeedback', insertqfeedbackData, controllers.qfeedback);
//拿到答题详情
router.get('/qresult', checkavgbyqid, qavg, feedbackResult, qresultm,controllers.qresult);
//获取排行榜的接口
router.get('/rankList', rankList, controllers.qfeedback);

/**
* 视频相关
*/
//获取视频类的列表
router.get('/videoclass', getVideoclassdata, controllers.videoclass);
//根据视频的分类获取列表的接口
router.get('/videolist', getVListById, controllers.videoclass);
//更新观看人数
router.get('/videoPnum', pnum, controllers.videoclass);
//获取视频详情的接口
router.get('/videoDetail', judgeTFoucs, getTeacherById, checkUserLastPostion, judgeFoucs, getVideoByVid, controllers.video);
//点击关注或者取消关注老师
router.get('/focusT', focusT, controllers.teacherfoucs);
//点击关注或者取消关注视频
router.get('/focusV', focusV, controllers.videofoucs);
//视频评论
router.get('/vcomment', insertVCommentData, controllers.vcomment);
//获取评论的集合的接口
router.get('/vcommentlist', getVCommentListById, controllers.vcomment);
//视频进度反馈
router.get('/vfeedback', insertvfeedbackData, controllers.vfeedback);

/**
 * 我的相关, 视频和题目总汇
 */
//获取相关联的视频
router.get('/getContactV', getContactV, controllers.contact);
//获取相关联的题
router.get('/getContactQ', getContactQ, controllers.contact);
//提交浏览题目
router.get('/qbrowse', qbrowse, controllers.qbrowse);
//获取浏览的题目
router.get('/getqbrowse', getqbrowse, controllers.qbrowse);
//提交浏览视频
router.get('/vbrowse', vbrowse, controllers.vbrowse);
//获取浏览的视频
router.get('/getvbrowse', getvbrowse, controllers.vbrowse);
//获取已经购买的套题
router.get('/buyVlist', buyVlist, controllers.members);
//获取已经购买的视频
router.get('/buyTlist', buyTlist, controllers.members);
//获取已经购买的套题
router.get('/getbuyTlist', getbuyQlist, controllers.members);
//获取已经购买的视频
router.get('/getbuyVlist', getbuyVlist, controllers.members);
//购买视频 
router.get('/buyV', buyV, controllers.members);
//购买题目
router.get('/buyQ', buyQ, controllers.members);
//查看文章
router.get('/getArticleById', judgeTFoucs, getTeacherById, judgeFoucs,getArticleById, controllers.article);
//查看自己录入的文章
router.get('/getUserArticle', getUserArticle, controllers.articlelist);

module.exports = router
