// pages/getuserInfo/getuserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backUrl:'',
    backType:'',
    callBack:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var backUrl = options.backUrl;
    var backType = options.backType;
    var callBack = options.callBack;
    this.setData({
      backUrl: backUrl,
      backType: backType,
      callBack: callBack
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
  onGotUserInfo:function(e){
    var that = this;
    console.log(e);
    var backUrl = that.data.backUrl;
    var backType = that.data.backType;
    var callBack = that.data.callBack;
    getApp().isLogin(backUrl, backType, callBack,1);
    // var encryptedData = e.detail.encryptedData;
    // var iv = e.detail.iv;
    // wx.request({
    //   url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/parseEncryptedData',//
    //   data: { 
    //     sessionId: wx.getStorageSync('3rd_session'),
    //     encryptedData: encryptedData,
    //     iv:iv
    //      },
    //   async: false,
    //   header: {
    //     "Content-Type": "applciation/json",
    //   },
    //   method: "GET",
    //   complete: function (res) {
        
    //   }
    // })
  }
})