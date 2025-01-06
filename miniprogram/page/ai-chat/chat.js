//管理页面逻辑，负责调用DeepSeek API并更新页面数据
Page({
  data: {
    messages: [], // 保存对话记录
    inputText: '', // 用户输入的文本
  },

  onLoad() {
    console.log('Chat page loaded');
  },

  handleInput(e) {
    this.setData({
      inputText: e.detail.value, // 更新输入框内容
    });
  },

  async sendMessage() {
    const { inputText, messages } = this.data;
    if (!inputText.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
      });
      return;
    }

    // 将用户消息加入对话列表
    this.setData({
      messages: [...messages, { sender: 'user', text: inputText }],
      inputText: '', // 清空输入框
    });

    try {
      // 调用DeepSeek API
      wx.request({
        url: 'https://api.deepseek.com/chat/completions',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-bad380283b46492c8e99254e04fe52cc',
        },
        data: {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: inputText },
          ],
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data.choices && res.data.choices[0]) {
            const aiReply = res.data.choices[0].message.content;
            this.setData({
              messages: [...this.data.messages, { sender: 'ai', text: aiReply }],
            });
          } else {
            console.error('API 响应错误：', res.data);
            wx.showToast({
              title: 'API响应异常',
              icon: 'none',
            });
          }
        },
        fail: (err) => {
          wx.showToast({
            title: '消息发送失败',
            icon: 'none',
          });
          console.error('API调用失败：', err);
        },
      });
    } catch (error) {
      wx.showToast({
        title: '发生错误',
        icon: 'none',
      });
      console.error('调用错误：', error);
    }
  },
});

