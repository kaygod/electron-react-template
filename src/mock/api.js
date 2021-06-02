const  express = require('express');   //引入express

const app = express();        //实例化express

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



app.listen(3001, () => {
    console.log(`监听端口${3001}`)
})


app.get('/getList',function(req, res){
    res.json(
      [
        {
          id:1,
          msg:"123"
        }
      ]
    );
})



