// component/scrool-x-home/scrllo-x-home.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageUrls:{
      type:Array,
      value:[],
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
   select:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange:function(event){
      this.select = event.detail.current+1;
      console.log(this.select);
      this.setData({
        select: this.select
      })
    },
    clickItem:function(event){
      let data = event.currentTarget.dataset.click;
      console.log(data);
    }
  }
})
