// pages/index/index.js

Page({
    data: {
      scores: []  // 用于保存从数据库查询到的通知数据
    },
  
    onLoad: function() {
      // 获取云数据库引用
      const db = wx.cloud.database();
  
      // 查询 "Score" 集合中的数据
      db.collection('Score')
        .get()
        .then(res => {
          console.log('获取成绩成功:', res.data);
          this.setData({
            scores: res.data  // 将查询到的数据保存到页面的data中
          });
        })
        .catch(err => {
          console.error('获取成绩失败:', err);
        });
    }
  });
  