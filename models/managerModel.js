const Base = require('./base.js');

// 定义用户模型并基础基础模型
class managerModel extends Base {

  constructor(props = 'manager') {
    super(props);
  }
}


module.exports = new managerModel();
