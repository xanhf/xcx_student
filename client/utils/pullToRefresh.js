class pullToRefresh{
  pullData={//控制页面
    isMore:true,//标记是否有更多
    isLoading:false,//标记是否正在加载数据
    noData:true,//是否显示空页面
  }
  //上拉加载页面的通用数据
  dataList=[]
  pullConfig ={ //控制访问网络逻辑
    url:"",//访问网络的地址
    method:0,//方法 0为get方法 1为post
    data:{},//传入接口的数据
  }

  pageSetting ={
    page: 0,//标记当前的页数
    pageSize: 10,//配置查找的页数
  }

success = function(res,isfresh){

  }

fail = function (res, isfresh){

  }


  /**
   * 注册方法 传入对应页面上下文，所需要的配置项
   */
 regist(context, url = "", data = {}, method = 0, pageSet = this.pageSetting, success = this.success,fail=this.fail){
    this.ctx=context;
    //初始化对象
    this.ctx.data.pullData= this.pullData;//预制对象 用来刷新ui
    this.ctx.data.dataList = this.dataList;//预制对象用来展示数据dataList
    this.ctx.setData({
      pullData: this.ctx.data.pullData,
      dataList: this.ctx.data.dataList
    });
    this.pageSetting=pageSet;
    this.pullConfig.data=data;
    this.pullConfig.url = url;
    this.pullConfig.method = method;
    this.success = success;
    this.fail = fail;
  }
  /**
   * 刷新的方法
   */
  pullRefresh(){
    if(this.pullData.isLoading){//正在加载
      return;
    }
    this.pullData.isLoading=true;
    this.pullConfig.data.page =0;
    this.requestApi();
  }

  /**
   * 请求网络数据
   */
  requestApi(){
    let api = getApp().globalData.wxAPI.getRequest(this.pullConfig.url, Object.assign(this.pullConfig.data, this.pageSetting));
    if (this.pullConfig.method == 1) {
      api = getApp().globalData.wxAPI.postRequest(this.pullConfig.url, Object.assign(this.pullConfig.data, this.pageSetting));
    }
    api.then(res => {//成功之后设置数据
      console.log(res);
      dataRefresh(res.data);
      this.success(res,this.pageSetting.page==0);
    }, err => {//错误
      this.pullData.isLoading = false;
      console.log("pullToRefresh-->"+e);
      this.fail(e, this.pageSetting.page == 0);
    }).catch(e => {//异常
      this.pullData.isLoading = false;
      console.log("pullToRefresh-->"+e);
      this.fail(e, this.pageSetting.page == 0);
    }); 
  }

  /**
   * 根据dataList判断是否有更多和是否显示空页面
   */
  dataRefresh(dataList){
    this.pullData.isLoading = false;
    if (dataList.length==0){
      if (this.pageSetting.page==0){//说明第一页没数据了显示空页面
        this.pullData.noData = true;
        this.ctx.data.dataList=[];
      }
      this.pullData.isMore=false;
      this.ctx.data.pullData = this.pullData;
      this.ctx.setData({
        dataList: this.ctx.data.dataList,
        pullData: this.ctx.data.pullData
      })
      return;
    }
    //有数据判断是否有更多
    if (dataList.length >= this.pageSetting.pageSize){
      this.pageSetting.page += 1;
        this.pullData.isMore =true;//还有更多
    }else{
      this.pullData.isMore = false;//没有更多了
    }
    if (this.pageSetting.page==0){//直接赋值
      this.ctx.data.dataList = dataList;
    }else{//添加
      this.ctx.data.dataList = this.ctx.data.dataList.concat(dataList);
    }
    //刷新UI
    this.ctx.setData({
      dataList: this.ctx.data.dataList,
      pullData: this.ctx.data.pullData
    })
  }

  /**
   * 加载更多
   */
  loadMore(){
    if (this.pullData.isLoading||!this.pullData.isMore){//正在加载或者没有更多则直接返回
      return;
    }
    this.pullData.isLoading = true;
    this.requestApi();
  }
}
module.exports = new pullToRefresh(); 
