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


const list = [
  {
    k_value:'k32',
    file_name:"plot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:1,
  },
  {
    k_value:'k33',
    file_name:"plot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:2,
  },
  {
    k_value:'k34',
    file_name:"plot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:3,
  },
  {
    k_value:'k35',
    file_name:"plot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:4,
  },
  {
    k_value:'k32',
    file_name:"plot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:5,
  },
  {
    k_value:'k35',
    file_name:"plot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:6,
  },
  {
    k_value:'k35',
    file_name:"plot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:7,
  },
  {
    k_value:'k35',
    file_name:"p,lot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:8,
  },
  {
    k_value:'k34',
    file_name:"plot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:9,
  },
  {
    k_value:'k33',
    file_name:"plot-k33-2021-05-12-11-14-0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d.plot",
    status:30,
    id:10,
  }
]
app.post('/getMachineData',function(req, res){
  res.json(
    {
      end_tasks:10,
      working_tasks:10,
      total_page:2,
      is_complete:false,
      status:status,
      k_type:32,
      list:list
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
    [{farmer_keys:'0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d',pool_keys:'0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d'},{farmer_keys:'0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d',pool_keys:'0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d0b453ed4ab93d0e4eb3bbbc8eb23661527091bff3951bc08d56cb5509fb1462d'}]
  );
})

app.post('/delete',function(req, res){
  res.json(
   {
     result:1
   }
  );
})
app.post('/deleteArr',function(req, res){
  list.splice(0,10)
  res.json(
   {
     result:1
   }
  );
})
