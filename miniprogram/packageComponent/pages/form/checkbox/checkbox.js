Page({
    data: {
      // 模拟已选课程数据
      selectedCourses: [
        {
          id: 1,
          name: "数学分析",
          teacher: "张老师",
          rating: 0,  // 初始评分为0
          comment: "",
          reviews: [
            { reviewId: 1, username: "李同学", comment: "课程讲解清晰，内容丰富。" },
            { reviewId: 2, username: "王同学", comment: "很有挑战性，但能学到很多。" }
          ]
        },
        {
          id: 2,
          name: "程序设计",
          teacher: "李老师",
          rating: 0,
          comment: "",
          reviews: [
            { reviewId: 1, username: "赵同学", comment: "内容充实，但作业量很大。" }
          ]
        },
        // 更多课程...
      ]
    },
  
    // 评分
    onRateCourse: function (e) {
      const { courseid, rating } = e.currentTarget.dataset;
      const updatedCourses = this.data.selectedCourses.map(course => {
        if (course.id === courseid) {
          course.rating = rating;
        }
        return course;
      });
  
      this.setData({
        selectedCourses: updatedCourses
      });
    },
  
    // 输入评论
    onCommentInput: function (e) {
      const { courseid } = e.currentTarget.dataset;
      const comment = e.detail.value;
      const updatedCourses = this.data.selectedCourses.map(course => {
        if (course.id === courseid) {
          course.comment = comment;
        }
        return course;
      });
  
      this.setData({
        selectedCourses: updatedCourses
      });
    },
  
    // 提交评价
    onSubmitReview: function (e) {
      const { courseid } = e.currentTarget.dataset;
      const currentCourse = this.data.selectedCourses.find(course => course.id === courseid);
  
      if (currentCourse.rating === 0 || !currentCourse.comment) {
        wx.showToast({
          title: '请先评分并填写评论',
          icon: 'none'
        });
        return;
      }
  
      // 模拟提交评价
      const newReview = {
        reviewId: Date.now(),
        username: "学生",  // 可以根据登录信息填写
        comment: currentCourse.comment
      };
  
      const updatedCourses = this.data.selectedCourses.map(course => {
        if (course.id === courseid) {
          course.reviews.push(newReview);
          course.comment = "";  // 清空评论框
          course.rating = 0;  // 重置评分
        }
        return course;
      });
  
      this.setData({
        selectedCourses: updatedCourses
      });
  
      wx.showToast({
        title: '评价提交成功',
        icon: 'success'
      });
    }
  });
  