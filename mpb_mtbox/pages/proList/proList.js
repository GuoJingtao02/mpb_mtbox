Page({
  data: {
    // text:"这是一个页面"
    proGoods: [],
    ageList: [],
    brandList:[],
    categoryList:[],
    dd: '',
    hidden: false,
    pageIndex: 0,
    pageSize:10,
    size: 20,
    hasMore: true,
    hasRefesh: false,
    // tab切换 
    currentTab: 5,
    winHeight:0,
    ageId : '',
    ageName:'年龄',
    starId: '',
    starName: '星级',
    brandId: '',
    brandName: '品牌',
    includeEmptyStockGoods:true,
    categoryIds: '',
    categoryParam:[],
    words:'',
    inputText:'',
    showSuggestCon:false

  },
  onLoad: function (options) {
    this.buildParam();
    console.log(this.data.currentTab);
    this.loadAge();
    this.loadBrand();
    this.loadCategory();
    this.loadData();
  },
  loadData: function() {
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/product/add',//
      data: {
         'sessionId': wx.getStorageSync('3rd_session'),
         'pageIndex': that.data.pageIndex,
         'pageSize':that.data.pageSize,
         'ages': that.data.ageId,
         'rentSizes' : that.data.starId,
         'brands': that.data.brandId,
         'includeEmptyStockGoods': that.data.includeEmptyStockGoods,
         'departments': that.data.categoryIds,
         'words': that.data.words

      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        if (res.data.length == 0) {
          that.setData({ hasMore:false})
        } else {
          var list = that.data.proGoods.concat(res.data);
          that.setData({
            proGoods: list,
            pageIndex: that.data.pageIndex + 1,
            hasRefesh: false
          });
        }
        
      }
    })
  },
  buildParam: function (options){
    var brands = getApp().globalData.brands;
    var brandname = getApp().globalData.brandname;
    this.setData({
      brandId: brands,
      currentTab: 5,
      winHeight: 0,
      pageIndex: 0,
      proGoods: [],
      ageId:'',
      ageName: '年龄',
      starId: '',
      starName: '星级'

    });
    if (brandname != '' && brandname != undefined) {
      this.setData({ brandName: brandname})
    }
    getApp().globalData.brands='';
    getApp().globalData.brandname='';
  },
  loadAge: function () {
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/product/age',//
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        that.setData({
          ageList: res.data
        });
      }
    })
  },
  loadBrand: function () {
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/product/brand',//
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        that.setData({
          brandList: res.data
        });
      }
    })
  },
  loadCategory: function () {
    var that = this;
    wx.request({
      url: 'https://www.72toy.com/mpb_mtbox/v/membership/rest/product/category',//
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (res) {
        
        var categoryParams = new Array();
        for(var i = 0;i<res.data.length;i++) {
          categoryParams.push(false);
        };
        that.setData({
          categoryList: res.data,
          categoryParam: categoryParams
        });
      }
    })
  },
  //加载更多
  loadMore: function (e) {
    var that = this;
    if (this.data.hasRefesh) return;
    if (!this.data.hasMore) return;
    that.setData({
      hasRefesh: true,
    });
    console.log(that.data.pageIndex);
    if (!this.data.hasMore) return;
    that.loadData();
  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      that.setData({ currentTab: 5, winHeight: 0 });
      return false;
    } else {
      if (e.currentTarget.dataset.current == 3) {
        that.setData({
          currentTab: e.currentTarget.dataset.current,
          winHeight: 450
        });
      } else {
        that.setData({
          currentTab: e.currentTarget.dataset.current,
          winHeight: 300
        });
      }
    }
  },
  search:function(e) {
    this.setData({ 
      currentTab:5,
      winHeight:0,
      pageIndex: 0,
      proGoods:[],
      hasMore:true
    });
    
    this.loadData();
  },
  swichAge: function(e) {
    var that = this;
    if (that.data.ageId == e.currentTarget.dataset.age) {
      return false;
    }
    that.setData({ 
      ageId: e.currentTarget.dataset.age,
      ageName: e.currentTarget.dataset.name,
      inputText:'',
      words: ''
    });
    that.search();
  },
  swichStar:function(e){
    var that = this;
    if (that.data.starId == e.currentTarget.dataset.star) {
      return false;
    }
    that.setData({
      starId: e.currentTarget.dataset.star,
      starName: e.currentTarget.dataset.name,
      inputText: '',
      words: ''
    });
    that.search();
  },
  swichBrand: function (e) {
    var that = this;
    if (that.data.brandId == e.currentTarget.dataset.brand) {
      return false;
    }
    that.setData({
      brandId: e.currentTarget.dataset.brand,
      brandName: e.currentTarget.dataset.name,
      inputText: '',
      words: ''
    });
    that.search();
  },
  swichStock: function(e) {
    var includeEmptyStockGoods = this.data.includeEmptyStockGoods;
    this.setData({
      includeEmptyStockGoods: !includeEmptyStockGoods
    });
  },
  swichCategory:function(e) {
    var categoryid = e.currentTarget.dataset.categoryid;
    var categoryIds = this.data.categoryIds;
    var categoryParam = this.data.categoryParam;
    var idx = e.currentTarget.dataset.idx;
    var flag = false;
    var categoryIdArray = new Array();
    if (categoryIds != '') {
      categoryIdArray = categoryIds.split(',');
    }
    if (categoryIdArray.includes(categoryid.toString())) {
      categoryIdArray.pop(categoryid);
    } else {
      flag = true;
      categoryIdArray.push(categoryid);
    }
    categoryParam[idx] = flag;
    if (categoryIdArray.length > 0) {
      categoryIds = categoryIdArray.join(',');
    } else {
      categoryIds = '';
    }
    this.setData({
      categoryIds: categoryIds,
      categoryParam: categoryParam
    });
  },
  clearCategory:function(){
    var categoryParam = this.data.categoryParam;
    for (var i = 0; i < categoryParam.length;i++) {
      categoryParam[i] = false;
    }
    this.setData({
      includeEmptyStockGoods: true,
      categoryParam: categoryParam,
      categoryIds:''
    });
    this.search();
  },
  submitCategory:function(){
    this.setData({
      inputText: '',
      words: ''
    });
    this.search();
  },
  searchCancel:function(){
    this.setData({
      showSuggestCon: false,
      words: '',
      inputText:''
    });
  },
  wordsFocus:function(){
    this.setData({
      showSuggestCon:true
    });
  },
  keywords: function (e){
    this.setData({
      words: e.detail.value
    })
  },
  searchBtn:function(){
    var categoryParam = this.data.categoryParam;
    for (var i = 0; i < categoryParam.length; i++) {
      categoryParam[i] = false;
    }
    this.setData({
      showSuggestCon: false,
      ageId: '',
      ageName: '年龄',
      starId: '',
      starName: '星级',
      brandId: '',
      brandName: '品牌',
      includeEmptyStockGoods: true,
      categoryParam: categoryParam,
      categoryIds: ''

    });
    this.search();
  },
  searchli:function(e){
    var name = e.currentTarget.dataset.name;
    this.setData({
      words:name,
      inputText:name
    })
    this.searchBtn();
  },
  /*refesh:function(e) {
    this.setData({
      words: '',
      inputText: ''
    })
    this.searchBtn();
  }*/
})