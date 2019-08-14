const Base = require('./base.js');

// 定义用户模型并基础基础模型
class courseModel extends Base {
  constructor(props = 'course') {
    super(props);
  }
}


module.exports = new courseModel();
