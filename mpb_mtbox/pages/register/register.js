// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTipWrap : false,
    readProtocol : false,
    yzming : false,
    yzm_time : 60,
    inputMobile:'',
    inputVerifyCode:'',
    inputInviteCode:'',
    requestCheckMd5:'23cdc18507b52418db7740cbb5543e54',
    backUrl:'',
    backType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      backUrl: options.backUrl,
      backType: options.backType
    });
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
  readProtocolFun:function(){
    var readProtocol = this.data.readProtocol;
    this.setData({
      readProtocol: !readProtocol
    })
  },
  getyzm:function() {
    if (!this.checkPhone()) {
      return false;
    }
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/verifyNote',//
      header: {
        "Content-Type": "applciation/json",
        "Cookie": "JSESSIONID=" + getApp().globalData.sessionId
      },
      data:{
        "childMobile": that.data.inputMobile,
        "requestCheckMd5": that.data.requestCheckMd5,
        "_": Date.parse(new Date())/1000
      },
      method: "GET",
      success: function (res) {
        var yzming = that.data.yzming;
        that.setData({
          yzming: true
        });
        that.countdown();
      },
      error: function (request) {
        this.showTip("抱歉！发送短信验证码失败");
      }
    })
   
  },
  // 倒计时
  countdown : function () {
    var that = this;
    setTimeout(function () {
      var yzm_time = that.data.yzm_time;
      if (yzm_time > 0) {
        that.countdown();
        that.setData({
          yzm_time: yzm_time-1
        });
      } else {
        that.setData({
          yzm_time: 60,
          yzming:false
        });
      }
     
    }, 1000);
  },
  inputMobile:function(e){
    this.setData({
      inputMobile:e.detail.value
    })
  },
  inputVerifyCode: function(e){
    this.setData({
      inputVerifyCode: e.detail.value
    })
  },
  inputInviteCode: function(e) {
    this.setData({
      inputInviteCode: e.detail.value
    })
  },
  checkPhone: function () {
    var reg_phone = /^1[2|3|4|5|6|7|8]\d{9}$/;
    var inputMobile = this.data.inputMobile;
    if (!(reg_phone.test(inputMobile))) {
      this.showTip("请输入正确的手机号码");
      return false;
    }
    return true;
	},
  login:function() {
    var that = this;
    if (!this.checkPhone()) {
      return;
    }
    var inputVerifyCode = this.data.inputVerifyCode;
    if (inputVerifyCode == '') {
      this.showTip("请输入验证码");
      return false;
    }
    var readProtocol = this.data.readProtocol;
    if (!readProtocol) {
      this.showTip("请同意本协议");
      return false;
    }
    var inputMobile = that.data.inputMobile;
    var inputInviteCode = this.data.inputInviteCode;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/wxLogin',//
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "inputMobile": inputMobile,
        "inputVerifyCode": inputVerifyCode,
        "inputInviteCode": inputInviteCode,
        "requestCheckMd5": that.data.requestCheckMd5,
        'sessionId': wx.getStorageSync('3rd_session'),
        "_": Date.parse(new Date())/1000
      },
      method: "POST",
      success: function (res) {
        var result = res.data.result;
        if (result == 0) {
          that.showTip("登陆成功");
          if (that.data.backType == 1) {
            wx.switchTab({
              url: that.data.backUrl
            })
          } else {
            wx.redirectTo({
              url: that.data.backUrl
            })
          }
        } else {
          that.showTip(res.data.errMessage);
        }
      },
      error: function (request) {
        that.showTip("抱歉！发送短信验证码失败");
      }
    })
  },
  showTip:function(msg) {
    var that = this;
    that.setData({
      showTipWrap: true,
      msg:msg
    });
    setTimeout(function () {
      that.setData({
        showTipWrap: false,
        msg: ''
      });
    }, 3000);
  }
})