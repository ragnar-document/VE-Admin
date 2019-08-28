const Base = require('./base.js');

// 定义用户模型并基础基础模型
class usersModel extends Base {
    constructor(props = 'users') {
      super(props);
    }
  }
  
  
  module.exports = new usersModel();