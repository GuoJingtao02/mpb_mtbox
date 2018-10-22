Page({
  data: {
    planList: [],
    currentItemId: '',
    loadType:'',
    realPrice:'',
    servicePrice:'',
    changeCount:'',
    payDeposit:0,
    discount:''
  },
  swiperChange: function (e) {
    var currentItemId = e.detail.currentItemId;
    this.changePlan(currentItemId);
  },
  clickChange: function (e) {
    var itemId = e.currentTarget.dataset.itemId;
    this.changePlan(itemId);
  },
  changePlan:function(planId){
    var plan = [];
    var planList = this.data.planList;
    var discount = '';
    for (var i = 0; i < planList.length; i++) {
      if (planList[i].plan.planId == planId) {
        plan = planList[i].plan;
        var discountList = planList[i].discountList;
        if (discountList.length > 0) {
          discount = discountList[0];
        }
        break;
      }
    }
    var paydeposit = plan.payDeposit;
    var changecount = plan.changeCount;
    var realprice = plan.realPrice;
    var serviceprice = plan.servicePrice;
    this.setData({
      currentItemId: planId,
      payDeposit: paydeposit,
      changeCount: changecount,
      realPrice: realprice,
      servicePrice: serviceprice,
      discount: discount
    })
  },
  selCoupon:function(){
    var planId = this.data.currentItemId;
    wx.navigateTo({
      url: '/pages/coupon/coupon?planId='+planId,
      success:function(){},
      complete:function(){}
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    var loadType=options.type;
    var planId = options.planId;
    getApp().login('/pages/zf/zf', 0, function () {
      that.loadData(loadType,planId);
    });
  },
  loadData:function(loadType,planId){
    wx.showLoading({
      title: '加载中',
    })
    var url = 'https://www.72toy.com/mpb_mtbox/v/membership/rest/plan/commonMember';
    if (loadType == '1') {
      url = 'https://www.72toy.com/mpb_mtbox/v/membership/rest/plan/seniorMember';
    }
    var that = this;
    wx.request({
      url: url,//
      data: { sessionId: wx.getStorageSync('3rd_session') },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == '1') {
          wx.showModal({
            title: '错误',
            content: res.data.message,
          })
          return;
        }
        var realPrice = '';
        var servicePrice = '';
        var changeCount = '';
        var payDeposit = 0;
        var discount = '';
        if(planId == '' || planId == undefined) {
          planId = res.data.voList[0].plan.planId;
          realPrice = res.data.voList[0].plan.realPrice;
          servicePrice = res.data.voList[0].plan.servicePrice;
          changeCount = res.data.voList[0].plan.changeCount;
          payDeposit = res.data.voList[0].plan.payDeposit;
          var discountList = res.data.voList[0].discountList;
          if (discountList.length > 0) {
            discount = discountList[0];
          }
        }
        that.setData({
           planList: res.data.voList, 
           currentItemId: planId, 
           loadType: loadType,
          realPrice: realPrice,
          servicePrice: servicePrice,
          changeCount: changeCount,
          payDeposit: payDeposit,
          discount:discount
        });
        wx.hideLoading();
      }
    })
  },
  pay:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var planId = this.data.currentItemId;
    var whetherDoorDeposit = false;
    var discountCode = this.data.discount.discountCode;
    if (discountCode == undefined) {
      discountCode = '';
    }
    wx.request({
      url: "https://www.72toy.com/mpb_mtbox/v/membership/rest/order/submit",//
      data: {
         sessionId: wx.getStorageSync('3rd_session'),
        "submit.planId": planId,
        "submit.whetherDoorDeposit":false,
        "discountCode": discountCode,
        "submit.paymentMethod":"smallApp"
        },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        if (res.data.resultCode == '0') {
          wx.showModal({
            title: '错误',
            content: res.data.errMessage,
          })
        } else {
          that.startPay(res.data.succMessage);
        }
      },
      complete:function(){
        wx.hideLoading();
      }
    })
  },
  startPay:function(orderId){
    var that = this;
    wx.request({
      url: "https://www.72toy.com/mpb_mtbox/m/membership/pay/submitPay",
      data: {
        sessionId: wx.getStorageSync('3rd_session'),
        orderId: orderId,
        orderTypeName: 'memberOrderPayerImpl',
        userPaymentConfirm: 'true',
        successPayUrl: '/pages/memberCenter/memberCenter',
        choosePayUrl: '/pages/zf/zf?type=' + that.data.loadType
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        var json = JSON.parse("{" + res.data + "}");
        wx.requestPayment(
          {
            'timeStamp': json.timeStamp,
            'nonceStr': json.nonceStr,
            'package': json.package,
            'signType': 'MD5',
            'paySign': json.paySign,
            'success': function (res) {
              wx.redirectTo({
                url: '/pages/memberCenter/memberCenter',
              })
             },
            'fail': function (res) {
              wx.showModal({
                title: '失败',
                content: '支付失败，请重新支付',
              })
             },
            'complete': function (res) { }
          })
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})
