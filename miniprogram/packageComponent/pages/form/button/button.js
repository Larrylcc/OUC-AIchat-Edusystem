// page.js
Page({
    data: {
      courses: []  // 存储课程数据
    },
  
    // 页面加载时获取课程数据
    onLoad: function() {
      const db = wx.cloud.database();
      db.collection('Course')  // 指定数据集合
        .get()
        .then(res => {
          console.log(res.data);  // 打印返回的数据
          this.setData({
            courses: res.data  // 设置到页面数据中
          });
        })
        .catch(err => {
          console.error("数据加载失败:", err);
        });
    },
  
    // 选课/取消选课操作
    toggleChoose: function(event) {
      const courseId = event.currentTarget.dataset.id;  // 获取当前点击课程的ID
      const db = wx.cloud.database();
      const courseIndex = this.data.courses.findIndex(course => course._id === courseId);
  
      if (courseIndex !== -1) {
        const course = this.data.courses[courseIndex];
        const newChooseStatus = !course.choose;  // 切换选课状态
  
        // 更新数据库中的选课状态
        db.collection('Course')
          .doc(courseId)
          .update({
            data: {
              choose: newChooseStatus  // 更新课程的选择状态
            }
          })
          .then(res => {
            // 更新前端数据
            this.setData({
              [`courses[${courseIndex}].choose`]: newChooseStatus
            });
          })
          .catch(err => {
            console.error("更新选课状态失败:", err);
          });
      }
    }
  });
  