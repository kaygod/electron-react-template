#!/bin/sh
# 硬件状态右边数据
msg=$(top -b -n 1 |tail -n +3|head -n 1)
cpu_free=${msg#* ni, }
cpu_free=${cpu_free% id,*}
cpu_free=${cpu_free}
cpu_use=$(echo "100 - $cpu_free"|bc)

msg=$(top -b -n 1 |tail -n +4|head -n 1)
mem_total=${msg#*MiB Mem : }
mem_total=${mem_total% total,*}
mem_free=${msg#*total,}
mem_free=${mem_free% free,*}
mem_use=$(echo "$mem_total - $mem_free"|bc)
mem_use=$(echo "scale=2;$mem_use*100/$mem_total"|bc)

dir_total=$(df |grep data* |wc -l)
echo "{'cpu_use':'$cpu_use','mem_use':'$mem_use','dir_total':'$dir_total'}"
