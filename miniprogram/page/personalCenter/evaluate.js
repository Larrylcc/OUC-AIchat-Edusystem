Page({
  data: {
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
    // 可以在这里添加提示信息，告知用户评价成功
    wx.showToast({
      title: '评价成功',
      icon: 'success',
      duration: 2000
    });
  }
});
