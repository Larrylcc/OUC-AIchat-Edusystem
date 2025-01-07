// 引入 config.js 模块，注意相对路径
const config = require('../../config.js'); 
const markdownToRichText = require('../../util/markdownToRichText')
Page({
  data: {
    messages: [], // 保存对话记录
    inputText: '', // 用户输入的文本
    options:['通用型','古风小生','英语老师'],
    selectedOption:'选择角色',
    isThinking: false,
  },

  handlePickerChange(e){
    const i = e.detail.value;
    const opt=this.data.options[i];
    this.setData({ selectedOption: opt });
    //console.log('Selected Option:',opt)
    /*if (i == 0) {
      wx.navigateTo({ url: '/page/ai-chat' });
    } else if (i == 1) {
      wx.navigateTo({ url: '/pages/englishTeacher' });
    } else {
      wx.navigateTo({ url: '/pageC/pageC' });
    }*/
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
    const { inputText, messages, selectedOption } = this.data;
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
      isThinking: true,
    });

    try {
      let systemPrompt = 'You are a helpful assistant.'; // 默认提示词
      if (selectedOption === '英语老师') {
        systemPrompt = 'You are an English teacher. You must respond in English only. If the user speaks Chinese, translate it into English and respond in English. Do not use any other language under any circumstances.'; // 英语老师角色提示词
      }
      if (selectedOption === '古风小生') {
        systemPrompt = '汝乃一古风小生，精通诗词歌赋，熟读四书五经。汝之言行，皆须以文言文出之，不得用白话。汝须以古人之礼待人，言辞优雅，引经据典，仿若古之文人雅士。若有人以白话问之，汝须将其言转为文言，再以文言答之。切记，汝之回答，务必合乎古风，不得有违。'; // 古风小生角色提示词
      }
      console.log('System Prompt:', systemPrompt);
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
            { role: 'system', content: systemPrompt },
            { role: 'user', content: inputText },
          ],
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data.choices && res.data.choices[0]) {
            console.log('API Response:', res.data); // 打印完整的 API 响应
            console.log('API response:', res.data);
            const aiReply = res.data.choices[0].message.content;
            const richText = markdownToRichText(aiReply);
            this.setData({
              messages: [...this.data.messages, { sender: 'ai', text: richText }],
              isThinking: false,
            });
          } else {
            console.error('API 响应错误：', res.data);
            wx.showToast({
              title: 'API响应异常',
              icon: 'none',
            });
            this.setData({
              isThinking: false,
            });
          }
        },
        fail: (err) => {
          wx.showToast({
            title: '消息发送失败',
            icon: 'none',
          });
          console.error('API调用失败：', err);
          this.setData({
            isThinking: false,
          })
        },
      });
    } catch (error) {
      wx.showToast({
        title: '发生错误',
        icon: 'none',
      });
      console.error('调用错误：', error);
      this.setData({
        isThinking: false,
      })
    }
  },
});
