const Base = require('./base.js');

// 定义用户模型并基础基础模型
class lessonModel extends Base {
  constructor(props = 'lesson') {
    super(props);
  }
}


module.exports = new lessonModel();
