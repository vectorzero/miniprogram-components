Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    resultObj: Object,
    countField: {
      type: 'String',
      value: 'count'
    },
    dataField: {
      type: 'String',
      value: 'data'
    },
    pageField: {
      type: 'String',
      value: 'page'
    },
    limitField: {
      type: 'String',
      value: 'limit'
    }
  },
  observers: {
    resultObj: function (val) {
      this.handleResult(val)
    }
  },
  data: {
    page: 1,
    limit: 10,
    count: 0,
    timer: null,
    scrollTop: 0,
    triggered: true,
    list: [],
    more: false
  },
  methods: {
    getList (more = false) {
      this.setData({
        more
      })
      const { page, limit, pageField, limitField } = this.data
      const params = {}
      params[pageField] = page
      params[limitField] = limit
      this.triggerEvent('getList', params)
    },
    handleResult (resultObj) {
      const res = Object.assign({}, resultObj)
      const { more, dataField, countField } = this.data
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      this.setData({
        triggered: false
      })
      let list = []
      if (res[dataField] && res[dataField].length > 0) {
        list = res[dataField]
      }
      if (more) {
        this.setData(
          {
            list: this.data.list.concat(list)
          },
          () => {
            wx.hideLoading()
          }
        )
      } else {
        this.setData(
          {
            list
          },
          () => {
            wx.hideLoading()
          }
        )
      }
      this.setData({
        count: res[countField]
      })
      this.triggerEvent('setList', this.data.list)
    },
    scrollToLower () {
      let { timer, count, page, limit } = this.data
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        if (page + 1 > Math.ceil(count / limit)) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
        } else {
          page++
          this.setData({
            page
          })
          this.getList(true)
        }
      }, 300)
    },
    refresherRefresh () {
      wx.showNavigationBarLoading()
      this.setData({
        page: 1
      })
      this.getList()
    }
  }
})
