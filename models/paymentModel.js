const Base = require('./base.js');

// 定义用户模型并基础基础模型
class paymentModel extends Base {

  constructor(props = 'payment') {
    super(props);
  }
}


module.exports = new paymentModel();
