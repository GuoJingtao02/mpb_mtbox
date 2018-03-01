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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo;
              var encryptedData = res.encryptedData;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    brands:'',
    brandname:'',
    code:''
  },
  login:function(backUrl,backType,callBack){
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/isLogin',//
      data: { sessionId: wx.getStorageSync('3rd_session')  },
      async:false,
      header: {
        "Content-Type": "applciation/json",
      },
      method: "GET",
      success: function (res) {
        var isLogin = res.data.isLogin;
        if (!isLogin) {
          wx.redirectTo({
            url: '/pages/register/register?backUrl='+backUrl+'&backType='+backType,
          })
        } else {
          typeof callBack == "function" && callBack();
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