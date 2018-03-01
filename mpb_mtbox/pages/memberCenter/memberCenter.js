// pages/memberCenter/memberCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memUserData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    getApp().login('/pages/memberCenter/memberCenter',1,function(){
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
  gowish:function(){
    wx.switchTab({
      url: '/pages/wish/wish',
    })
  },
  loadData:function(){
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/info',//
      data: { sessionId: wx.getStorageSync('3rd_session') },
      header: {
        "Content-Type": "applciation/json",
      },
      method: "GET",
      success: function (res) {
        that.setData({
          memUserData: res.data
        });
      }
    })
  }
})