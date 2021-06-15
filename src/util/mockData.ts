/**
 * 数据集合
 */
export const mockDataList = {
  "/getStatus":{
    status:1
  },
  "/startWork":{
    result:1
  },
  "/getMachineData":{
      end_tasks:10,
      working_tasks:10,
      total_page:2,
      is_complete:false,
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
        }
      ]
    },
  "/switchMachine":{
    result:1
  },
  "/stop":{
    result:1
  },
  "/getHardStatus":{
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
      }, {
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
  },
  "/switchKey":{
    result:1
  },
  "/getKey": [{farm_key:'123',pool_key:'456'},{farm_key:'789',pool_key:'111'}]
}
