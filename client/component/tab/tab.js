// component/tab/tab.js
/**
 * tab切换的组件
 * 1.属性传入数组文字显示
 * 2.点击切换回调事件。selectChanged(index)回调点击的选中的位置
 */
Component({

  properties: {
    tabList: {
      type: Array,
      value: [],
    }
  },

  /**
   * 页面的初始数据
   * 
   */
  data: {
    select:0
  },
  /**
    * 组件的方法列表
    */
  methods: {
    changeViewType: function (event) {
      this.select = event.currentTarget.dataset.select;
      console.log(this.select);
      this.setData({
        select: this.select
      })
    }
  }
})