const cors = {
    allowAll:function(req,res,next){
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Credentials', true);
      next();
    }
  }
  
  module.exports = cors;