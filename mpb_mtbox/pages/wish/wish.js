// pages/wish/wish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wishLength:0,
    wishList:[],
    editWord : "1",
    wishSelect:[],
    selectItem:[],
    selectAll:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.loadData();
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
    getApp().login('/pages/wish/wish', 1, function(){
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
  edit:function(e){
    var editword = e.currentTarget.dataset.editword;
    this.setData({ editWord: editword });
  },
  deleteone:function(e) {
    var goodsid = e.currentTarget.dataset.goodsid;
    var goodsindex = e.currentTarget.dataset.goodsindex;
    
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/deletewish',//
      data: { 
        sessionId: wx.getStorageSync('3rd_session'),
        delGoodsIds:goodsid
      },
      header: {
        "Content-Type": "applciation/json",
      },
      method: "GET",
      success: function (res) {
        if (res.data.resultCode == 1) {
          that.deleteArray(goodsindex);
          var selectItem = that.data.selectItem;
          that.deleteItem(selectItem, goodsid);
          that.setData({
            selectItem: selectItem
          })
        }
      }
    })
  },
  deleteArray:function(index){
    
      var wishList = this.data.wishList;
      var wishSelect = this.data.wishSelect;
      wishList.splice(index,1);
      wishSelect.splice(index, 1);
      this.setData({
        wishLength: wishList.length,
        wishList: wishList,
        wishSelect: wishSelect
       });
    
  },
  goList:function(){
    wx.switchTab({
      url: '/pages/proList/proList'
    })
  },
  loadData:function(){
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/wish',//
      data: { sessionId: wx.getStorageSync('3rd_session') },
      header: {
        "Content-Type": "applciation/json",
      },
      method: "GET",
      success: function (res) {
        var wishSelect = that.data.wishSelect;
        for(var i = 0;i<res.data.length;i++) {
          wishSelect[i] = false;
        }
        that.setData({
          wishLength: res.data.length,
          wishList: res.data,
          wishSelect: wishSelect,
          selectItem:[],
          selectAll:false
        });
      }
    })
  },
  selectItem:function(e){
    var index = e.currentTarget.dataset.index;
    var goodsId = e.currentTarget.dataset.goodsid;
    var wishSelect = this.data.wishSelect;
    var selectItem = this.data.selectItem;
    var selectAll = this.data.selectAll;
    if (wishSelect[index] == true) {
      wishSelect[index] = false;
      this.deleteItem(selectItem,goodsId);
    } else {
      wishSelect[index] = true;
      selectItem.push(goodsId);
    }
    var count = 0;
    for(var i=0;i<wishSelect.length;i++) {
      var flag = wishSelect[i];
      if (flag) {
        count ++;
      }
    }
    if (count == wishSelect.length) {
      selectAll = true;
    } else {
      selectAll = false;
    }
    this.setData({
      wishSelect: wishSelect,
      selectItem: selectItem,
      selectAll: selectAll

    })
  },
  deleteItem:function(array,item) {
    for(var i=0;i<array.length;i++) {
      if (array[i] == item) {
        array.splice(i,1);
      }
    }
  },
  selectAll:function() {
    var selectAll = this.data.selectAll;
    var wishSelect = this.data.wishSelect;
    var selectItem = this.data.selectItem;
    var wishList = this.data.wishList;
    if (selectAll) {
      for (var i = 0; i < wishSelect.length; i++) {
        wishSelect[i] = false;
      }
      selectAll = false;
      selectItem = [];
    } else {
      for (var i = 0; i < wishSelect.length; i++) {
        wishSelect[i] = true;
      }
      for (var i = 0; i < wishList.length;i++) {
        selectItem[i] = wishList[i].goodsId;
      }
      selectAll = true;
    }
    this.setData({
      wishSelect: wishSelect,
      selectItem: selectItem,
      selectAll:selectAll
    })
  },
  deleteBeach:function(){
    var selectItem = this.data.selectItem;
    console.log(selectItem.join(","));
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/member/deletewish',//
      data: {
        sessionId: wx.getStorageSync('3rd_session'),
        delGoodsIds: selectItem.join(",")
      },
      header: {
        "Content-Type": "applciation/json",
      },
      method: "GET",
      success: function (res) {
        if (res.data.resultCode == 1) {
          var wishSelect = that.data.wishSelect;

          //循环删除后数组下标变化，所以从后往前删
          for (var i = wishSelect.length;i>=0;i--) {
            if (wishSelect[i] == true) {
              that.deleteArray(i);
            }
          }
          var selectItem = [];
          that.setData({
            selectItem: selectItem
          })
        }
      }
    })
  }
})