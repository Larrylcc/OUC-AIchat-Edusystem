Page({
    data: {
      currentMonth: '',
      calendarBody: [],
      currentMonthIndex: 0,  // 当前月份索引
    },
  
    onLoad: function() {
      this.generateCalendar(0); // 默认显示当前月
    },
  
    months: [
      { name: '一月', days: 31, startDay: 3 },
      { name: '二月', days: 28, startDay: 6 },
      { name: '三月', days: 31, startDay: 6 },
      { name: '四月', days: 30, startDay: 2 },
      { name: '五月', days: 31, startDay: 5 },
      { name: '六月', days: 30, startDay: 1 },
      { name: '七月', days: 31, startDay: 4 },
      { name: '八月', days: 31, startDay: 7 },
      { name: '九月', days: 30, startDay: 3 },
      { name: '十月', days: 31, startDay: 6 },
      { name: '十一月', days: 30, startDay: 2 },
      { name: '十二月', days: 31, startDay: 5 }
    ],
  
    generateCalendar: function(monthIndex) {
      const month = this.months[monthIndex];
      let calendarBody = [];
  
      let monthTitle = `${2025}年 ${month.name}`;
      
      const totalDays = month.days;
      const startDay = month.startDay;
      let week = [];
  
      for (let i = 1; i < startDay; i++) {
        week.push('');
      }
  
      for (let day = 1; day <= totalDays; day++) {
        if (week.length === 7) {
          calendarBody.push(week);
          week = [];
        }
        week.push(day);
      }
  
      while (week.length < 7) {
        week.push('');
      }
      calendarBody.push(week);
  
      this.setData({
        currentMonth: monthTitle,
        calendarBody: calendarBody,
        currentMonthIndex: monthIndex
      });
    },
  
    // 上一月
    prevMonth: function() {
      let newMonthIndex = this.data.currentMonthIndex - 1;
      if (newMonthIndex < 0) {
        newMonthIndex = this.months.length - 1; // 如果是1月，跳到12月
      }
      this.generateCalendar(newMonthIndex);
    },
  
    // 下一月
    nextMonth: function() {
      let newMonthIndex = this.data.currentMonthIndex + 1;
      if (newMonthIndex >= this.months.length) {
        newMonthIndex = 0; // 如果是12月，跳到1月
      }
      this.generateCalendar(newMonthIndex);
    }
  });
  