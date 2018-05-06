/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://ltzbq7p9.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,
        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,
        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,
        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,
        //获取首页的接口
        home: `${host}/weapp/home`,
        //获取问题分类的接口
        qClass: `${host}/weapp/questionclass`,
        //获取问题列表根据分类的id
        qList: `${host}/weapp/questionlist`,
        //获取问题的详情根据题的id
        qDetail: `${host}/weapp/questionDetail`,
        //题目预览
        qReview: `${host}/weapp/qtopicnamelist`, 
        //获取评论的接口
        qCommentList: `${host}/weapp/qcommentList`, 
        //点赞的接口 qparise
        qparise: `${host}/weapp/qparise`, 
        //评论的接口 qcomment
        qcomment: `${host}/weapp/qcomment`, 
        //获取第一道题 qftopic qId
        qftopic: `${host}/weapp/qftopic`, 
        //获取下一道题 qtopic topicId
        qtopic: `${host}/weapp/qtopic`, 
        //上传答题的反馈 qfeedback
        qfeedback: `${host}/weapp/qfeedback`, 
        //获取答题结果 qresult
        qresult: `${host}/weapp/qresult`, 
        //获取题目排行榜的接口 rankList id
        rankList: `${host}/weapp/rankList`, 
    }
};

const constants = {
  WX_HEADER_CODE: 'X-WX-Code',
    WX_HEADER_ENCRYPTED_DATA: 'X-WX-Encrypted-Data',
      WX_HEADER_IV: 'X-WX-IV',
        WX_HEADER_ID: 'X-WX-Id',
          WX_HEADER_SKEY: 'X-WX-Skey',

            WX_SESSION_MAGIC_ID: 'F2C224D4-2BCE-4C64-AF9F-A6D872000D1A',

              ERR_INVALID_PARAMS: 'ERR_INVALID_PARAMS',

                ERR_WX_LOGIN_FAILED: 'ERR_WX_LOGIN_FAILED',
                  ERR_WX_GET_USER_INFO: 'ERR_WX_GET_USER_INFO',
                    ERR_LOGIN_TIMEOUT: 'ERR_LOGIN_TIMEOUT',
                      ERR_LOGIN_FAILED: 'ERR_LOGIN_FAILED',
                        ERR_LOGIN_SESSION_NOT_RECEIVED: 'ERR_LOGIN_MISSING_SESSION',

                          ERR_SESSION_INVALID: 'ERR_SESSION_INVALID',
                            ERR_CHECK_LOGIN_FAILED: 'ERR_CHECK_LOGIN_FAILED',
};

module.exports = {
  constants,
    config
};
