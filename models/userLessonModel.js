const Base = require('./base.js');

// 定义用户模型并基础基础模型
class userLessonModel extends Base {
    constructor(props = 'user_lesson') {
      super(props);
    }
  }
  
  
  module.exports = new userLessonModel();