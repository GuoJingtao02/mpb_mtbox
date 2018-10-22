//app.js
App({
  config: {
    host: 'https://www.72toy.com' // 这个地方填写你的域名
  },
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    wx.login({
      success: res => {
        if (res.code) {
          that.globalData.code = res.code;
          //发起网络请求
          wx.request({
            url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/getSessionKeyOropenid',
            data: {
              code: res.code
            },
            header: {
              "Content-Type": "applciation/json"
            },
            method: "GET",
            success: function (result) {
              wx.setStorageSync('3rd_session', result.data.key_3rd_session);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    
  },
  globalData: {
    userInfo: null,
    brands:'',
    brandname:'',
    code:'',
    unionid:'',
  },
  login:function(backUrl,backType,callBack){
    var that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.isLogin(backUrl, backType, callBack);
        } else {
          wx.redirectTo({
            url: '/pages/getuserInfo/getuserInfo?backUrl=' + backUrl + '&backType=' + backType+'&callBack='+callBack
          })
        }
      }
    })
  },
  isLogin: function (backUrl, backType, callBack,redirectType){
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/isLogin',//
      data: { sessionId: wx.getStorageSync('3rd_session') },
      async: false,
      header: {
        "Content-Type": "applciation/json",
      },
      method: "GET",
      success: function (res) {
        var isLogin = res.data.isLogin;
        if (!isLogin) {
          wx.redirectTo({
            url: '/pages/register/register?backUrl=' + backUrl + '&backType=' + backType,
          })
        } else {
          if (redirectType == 1) {
            if (backType == 1) {
              wx.switchTab({
                url: backUrl
              })
            } else {
              wx.redirectTo({
                url: backUrl
              })
            }
          } else {
            typeof callBack == "function" && callBack();
          }
          
        }
      }
    })
  },
  lAlert: function (title) {
    wx.showModal({
      title: title,
      content: '',
      showCancel: false,
      cancelText: '',
      cancelColor: '',
      confirmText: '确定',
      confirmColor: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
  
})