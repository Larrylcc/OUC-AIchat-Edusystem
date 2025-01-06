Page({
  data: {
    studentInfo: {
      major: '2022级计算机科学与技术',
      name: '小程序管理员小明',
      studentId: '22020031803'
    },
    evaluations: [] // 存储评价信息
  },
  submitEvaluation: function(e) {
    const content = e.detail.value.content;
    const score = e.detail.value.score;
    // 模拟评价提交
    const newEvaluation = {
      content: content,
      score: score
    };
    this.setData({
      evaluations: [...this.data.evaluations, newEvaluation]
    });
    // 提示用户评价成功
    wx.showToast({
      title: '评价成功',
      icon: 'success',
      duration: 2000
    });
  }
});
