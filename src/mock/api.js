const  express = require('express');   //引入express

const app = express();        //实例化express

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

let status = 1

app.listen(3001, () => {
    console.log(`监听端口${3001}`)
})

app.post('/getStatus',function(req, res){
  res.json(
    {
      status:status,
      k_type:null
    }
  );
})

app.post('/startWork',function(req, res){
  status = 2
  res.json(
    {
      result:1
    }
  );
})



app.post('/getMachineData',function(req, res){
  res.json(
    {
      end_tasks:10,
      working_tasks:10,
      total_page:2,
      is_complete:false,
      status:status,
      k_type:null,
      list:[
        {
          k_value:30,
          file_name:"admin",
          status:30
        },
        {
          k_value:40,
          file_name:"admin",
          status:30
        },
        {
          k_value:50,
          file_name:"admin",
          status:30
        },
        {
          k_value:30,
          file_name:"admin",
          status:30
        },
        {
          k_value:30,
          file_name:"admin",
          status:30
        },
        {
          k_value:70,
          file_name:"admin",
          status:30
        },
        {
          k_value:30,
          file_name:"admin",
          status:30
        },
        {
          k_value:90,
          file_name:"admin",
          status:30
        },
        {
          k_value:30,
          file_name:"admin",
          status:30
        },
        {
          k_value:90,
          file_name:"admin",
          status:30
        }
      ]
    }
  );
})


app.post('/switchMachine',function(req, res){
  res.json(
    {
      result:1
    }
  );
})


app.post('/stop',function(req, res){
  status = 1
  res.json(
    {
      result:1
    }
  );
})



app.post('/getHardStatus',function(req, res){
  res.json(
    {
      cpu_rate:10,
      memory_rate:98,
      total_page:2,
      page_no:1,
      list:[
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        }, {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },{
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"300"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },{
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"100"
        },
        {
          hard_disk:"had",
          draw_num:"122",
          draw_capacity:"300"
        }
      ]
    }
  );
})

app.post('/switchKey',function(req, res){
  res.json(
    {
      result:1
    }
  );
})


app.post('/getKey',function(req, res){
  res.json(
    [{farm_key:'123',pool_key:'456'},{farm_key:'789',pool_key:'111'}]
  );
})
