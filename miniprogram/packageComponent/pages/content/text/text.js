// pages/index/index.js

Page({
    data: {
      notices: []  // 用于保存从数据库查询到的通知数据
    },
  
    onLoad: function() {
      // 获取云数据库引用
      const db = wx.cloud.database();
  
      // 查询 "Notice" 集合中的数据
      db.collection('Notice')
        .get()
        .then(res => {
          console.log('获取通知成功:', res.data);
          this.setData({
            notices: res.data  // 将查询到的数据保存到页面的data中
          });
        })
        .catch(err => {
          console.error('获取通知失败:', err);
        });
    }
  });
  