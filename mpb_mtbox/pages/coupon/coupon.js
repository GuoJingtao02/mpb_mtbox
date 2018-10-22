// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeli:1,
    noUseList:[],
    useedList:[],
    timeOutList:[],
    discountCode:'',
    inputText:'',
    planId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var planId = options.planId;
    this.setData({
      planId:planId
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
    var that = this;
    getApp().login('/pages/coupon/coupon', 2, function () {
      that.loadData();
    });
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
  loadData:function(){
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/coupon',//
      data: { sessionId: wx.getStorageSync('3rd_session'),planId:that.data.planId },
      header: {
        "Content-Type": "applciation/json",
      },
      method: "GET",
      success: function (res) {
        that.setData({
          noUseList: res.data.noUseList,
          useedList: res.data.useedList,
          timeOutList: res.data.timeOutList
        });
      }
    })
  },

  switchli: function (e){
    var typeli = e.currentTarget.dataset.type;
    this.setData({ typeli: typeli });
  },
  bindKeyInput: function (e) {
    this.setData({
      discountCode: e.detail.value
    })
  },
  submitDiscount:function(e) {
    var discountCode = this.data.discountCode;
    if (discountCode == undefined || discountCode == '') {
      getApp().lAlert("请输入兑换码");
      return;
    }

    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/addCoupon',//
      data: { 
          sessionId: wx.getStorageSync('3rd_session'),
          discountCode: discountCode
      },
      header: {
        "Content-Type": "applciation/json",
      },
      method: "GET",
      success: function (res) {
        if (res.data.resultCode == 1) {
          var noUseList = that.data.noUseList;
          noUseList.push(res.data.userDiscount);
          that.setData({
            noUseList: noUseList,
            inputText:''
          });
          getApp().lAlert("优惠券发放成功");
        } else {
          getApp().lAlert(res.data.errMessage);
        }
       
      }
    })
    
  },
  useDiscount:function(e){
    var discountCode = e.currentTarget.dataset.discountcode;
    var discountMoney = e.currentTarget.dataset.discountmoney;

    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    let prevPage = pages[pages.length - 2];
    var discount = '';
    
    discount = {"discountCode":discountCode,"discountMoney":discountMoney};

    prevPage.setData({  
      discount:discount
    })
    wx.navigateBack({
      delta:1
    })
  }
})