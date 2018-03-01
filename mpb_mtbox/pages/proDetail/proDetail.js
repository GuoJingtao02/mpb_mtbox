// pages/proDetail/proDetail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsVo:'',
    goodsId:'',
    onWish:false,
    article:'',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicator_active_color: '#5dae98',
    viewWidth:'',
    viewHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goodsId = options.goodsId;
    if (goodsId == '' || goodsId == undefined) {
      goodsId = wx.getStorageSync('detailGoodsId');
    }
    this.setData({
      goodsId: goodsId
    });
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/product/detail',
      data: { 'goodsId': that.data.goodsId, sessionId: wx.getStorageSync('3rd_session') },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        var temp_data1 = res.data.product.mainContentDetail;
        var temp_data2 = res.data.product.brand.mainContentDetail;
        var temp_data3 = temp_data1;
        if (temp_data2 != '' && temp_data2 != undefined) {
          temp_data3 = temp_data1 + temp_data2;
        }
        var temp = WxParse.wxParse('article', 'html', temp_data3, that, 5);
        that.setData({
          goodsVo: res.data,
          //article: temp,
          onWish: res.data.onWish
        });
      }
    })
  },
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 750,           //设置图片显示宽度，
      viewHeight = 750 / ratio;    //计算的高度值
    var image = this.data.images;
    this.setData({
      viewWidth: viewWidth,
      viewHeight: viewHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  addWish:function(){
    var that = this;
    var backUrl = '/pages/proDetail/proDetail';
    wx.setStorageSync("detailGoodsId",that.data.goodsId);
    getApp().login(backUrl, 2, function () {
      wx.request({
        url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/product/addWish',
        data: { 'goodsId': that.data.goodsId, sessionId: wx.getStorageSync('3rd_session') },
        header: {
          "Content-Type": "applciation/json"
        },
        method: "GET",
        success: function (res) {
          if (res.data.resultCode == 1) {
            that.setData({onWish:true});
          } else {
            getApp().lAlert(res.data.errMessage);
          }
        }
      })
    });
  }
})