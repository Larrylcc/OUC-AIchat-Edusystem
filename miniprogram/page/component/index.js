Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})

    if (wx.canIUse('getExptInfoSync')) {
      console.log('getExptInfoSync expt_args_1', wx.getExptInfoSync(['expt_args_1']))
      console.log('getExptInfoSync expt_args_2', wx.getExptInfoSync(['expt_args_2']))
      console.log('getExptInfoSync expt_args_3', wx.getExptInfoSync(['expt_args_3']))
    }
    if (wx.canIUse('reportEvent')) {
      wx.reportEvent('expt_event_1', {expt_data: 1})
      wx.reportEvent('expt_event_2', {expt_data: 5})
      wx.reportEvent('expt_event_3', {expt_data: 9})
      wx.reportEvent('expt_event_4', {expt_data: 200})

      wx.reportEvent('weexpt_event_key_1', {option_1: 1, option_2: 10, option_str_1: 'abc'})
      wx.reportEvent('weexpt_event_key_1', {option_1: 'abc', option_2: '1000', option_str_1: '1'})
    }
  },
  onShareAppMessage() {
    return {
      title: '学生主页',
      path: 'page/component/index'
    }
  },
  onShareTimeline() {
    '学生主页'
  },

  data: {
    list: [
      {
        id: 'view',
        name: '我的课表',
        open: false,
        pages: ['scroll-view']
      }, {
        id: 'content',
        name: '教务通知',
        open: false,
        pages: ['text']
      }, {
        id: 'form',
        name: '选课系统',
        open: false,
        pages: ['button']
      }, {
        id: 'nav',
        name: '学校校历',
        open: false,
        pages: ['navigator']
      }, {
        id: 'media',
        name: '成绩查询',
        open: false,
        pages: ['image']
      },
    ],
    theme: 'light'
  },

  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  }
})
