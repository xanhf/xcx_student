/**
 * 关联数据库
 * config.db
 * QUESTION
 */
const { mysql: config } = require('../config')
const fairies = "fairies";


/**
 * 获取数据库配置
 * dbName = config.db默认是CAuthDB数据库
 */
let getDb = function (dbName = config.db) {
return {
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: dbName,
    charset: config.char,
    multipleStatements: true
  }
}
};

const CAuthDB = require('knex')(getDb(config.db));
const FairiesDB = require('knex')(getDb(fairies))

module.exports = {
  cAuth:CAuthDB,
  Fairies: FairiesDB
}