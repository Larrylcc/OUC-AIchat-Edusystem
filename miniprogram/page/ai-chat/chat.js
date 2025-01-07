// 引入 config.js 模块，注意相对路径
const config = require('../../config.js'); 
const markdownToRichText = require('../../util/markdownToRichText')
Page({
  data: {
    messages: [], // 保存对话记录
    inputText: '', // 用户输入的文本
    options:['通用型','role2','role3'],
    selectedOption:'选择角色',
  },

  handlePickerChange(e){
    const i = e.detail.value;
    const opt=this.data.options[i];
    this.setData({ selectedOption: opt });
    if (i == 0) {
      wx.navigateTo({ url: '/page/ai-chat' });
    } else if (i == 1) {
      wx.navigateTo({ url: '/pages/englishTeacher' });
    } else {
      wx.navigateTo({ url: '/pageC/pageC' });
    }
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
      // 调用 DeepSeek API
      wx.request({
        url: config.API_URL, // 使用配置文件中的 API 地址
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`, // 使用配置文件中的 API Key
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
            const richText = markdownToRichText(aiReply);
            this.setData({
              messages: [...this.data.messages, { sender: 'ai', text: richText }],
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
