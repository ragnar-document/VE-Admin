const Base = require('./base.js');

// 定义用户模型并基础基础模型
class userClassModel extends Base {
    constructor(props = 'user_class') {
      super(props);
    }
  }
  
  
  module.exports = new userClassModel();