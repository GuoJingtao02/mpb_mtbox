// pages/seniorMember/seniorMember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    linum: 0,
    planid: '',
    commonPlanList: [],
    changeCount: '',
    gridCount: '',
    money: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
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
  /**
   * 加载页面数据
   */
  loadData: function () {
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/seniorMember',//
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        that.setData({ commonPlanList: res.data });
        var firstData = res.data[0];
        that.setData({ changeCount: firstData.changeCount });
        that.setData({ gridCount: firstData.gridCount });
        that.setData({ money: firstData.servicePrice / 100 });
      }
    })
  },
  selectMe: function (event) {
    var linum = event.currentTarget.dataset.linum;
    var changeCount = event.currentTarget.dataset.changecount;
    var money = event.currentTarget.dataset.money;
    this.setData({ linum: linum });
    this.setData({ changeCount: changeCount });
    this.setData({ money: money });
  }
})