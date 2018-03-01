//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicator_active_color:'#5dae98',
    images: {},
    reduceGoods:[],
    newGoods:[],
    hotGoods:[],
    bigGoods:[],
    musicGoods:[],
    guidaoGoods:[],
    tangzheGoods:[],
    zuozheGoods:[],
    zouzheGoods:[],
    paozheGoods:[],
    quanmianGoods:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 750,           //设置图片显示宽度，
      viewHeight = 750 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  getTopic: function (topicId,topicType) {
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/newShelves',//
      data: { 'topicId':topicId},
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        //console.log(res.data);
        if (topicType == 'reduceGoods') {
          that.setData({ reduceGoods: res.data });
        } else if (topicType == 'newGoods') {
          that.setData({ newGoods: res.data });
        } else if (topicType == 'hotGoods') {
          that.setData({ hotGoods: res.data });
        } else if (topicType == 'bigGoods') {
          that.setData({ bigGoods: res.data });
        } else if (topicType == 'musicGoods') {
          that.setData({ musicGoods: res.data });
        } else if (topicType == 'guidaoGoods') {
          that.setData({ guidaoGoods: res.data });
        } else if (topicType == 'tangzheGoods') {
          that.setData({ tangzheGoods: res.data });
        } else if (topicType == 'zuozheGoods') {
          that.setData({ zuozheGoods: res.data });
        } else if (topicType == 'zouzheGoods') {
          that.setData({ zouzheGoods: res.data });
        } else if (topicType == 'paozheGoods') {
          that.setData({ paozheGoods: res.data });
        } else if (topicType == 'quanmianGoods') {
          that.setData({ quanmianGoods: res.data });
        }
        
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  onLoad: function () {
    this.getTopic('20103951','reduceGoods');
    this.getTopic('20102544', 'newGoods');
    this.getTopic('20102545', 'hotGoods');
    this.getTopic('20104028', 'bigGoods');
    this.getTopic('20104027', 'musicGoods');
    this.getTopic('20104026', 'guidaoGoods');

    this.getTopic('20104020', 'tangzheGoods');
    this.getTopic('20104021', 'zuozheGoods');
    this.getTopic('20104023', 'zouzheGoods');
    this.getTopic('20104025', 'paozheGoods');
    this.getTopic('20104024', 'quanmianGoods');
  },
  goList:function(e){
    getApp().globalData.brands = e.currentTarget.dataset.brands;
    getApp().globalData.brandname = e.currentTarget.dataset.brandname;
    wx.switchTab({
      url: '/pages/proList/proList',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      } 
    });
  }
})
