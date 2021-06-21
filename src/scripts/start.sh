#!/bin/sh
cpu_total=96
memory_total=376000000
if [ ! -n "$1" ];
then
  echo "{'error_no':102}"
  exit 102
else
  case $1 in
k32)
  #echo 'k32'
  plot_size=102
  plot_size2=239
  cpu_unit=2
  memory_unit=4000
  ;;
k33)
  #echo 'k33'
  plot_size=209
  plot_size2=521
  cpu_unit=3
  memory_unit=8000
  ;;
k34)
  #echo 'k34'
  plot_size=493
  plot_size2=1041
  cpu_unit=4
  memory_unit=16000
  ;;
k35)
  #echo 'k35'
  plot_size=885
  plot_size2=2175
  cpu_unit=5
  memory_unit=32000
  ;;
*)
  echo "{'error_no':101}"
  exit 102
esac
fi
if [ ! -n "$2" ];
then
  echo "{'error_no':102}"
  exit 102
fi
if [ ! -n "$3" ];
then
  echo "{'error_no':102}"
  exit 102
fi
exec bash stop.sh >/dev/null 2>&1 &

disk_data=`df -h|grep '/data*' |awk '{print $4,$6}'|while read line
do
  value=0
  disk_size=${line%% *}
  disk_path=${line#* }
  unit=${disk_size:0-1}
  if [ "$unit" == "G" ];
    then
      value=${disk_size%%$unit*}
  fi
  if [ "$unit" == "T" ];
    then
      value=${disk_size%%$unit*}
      value=$(echo "$value * 1000"|bc)
      value=${value%%.*}
  fi
  if [ "$value" -gt 0 ];
  then 
      amount=$(echo "$value/$plot_size"|bc)
      amount=${amount%%.*}
  else
    amount=0
  fi

  amount_ping=$(ps -ef |grep 'plots create'|grep "$disk_path "|wc -l)
  amount_ping=$(echo "$amount_ping/2"|bc)
  amount_ping=${amount_ping%%.*}


  if [ "$amount" -gt "$amount_ping" ];
  then
    amount=$(echo "$amount-$amount_ping"|bc)  
    echo "@l_s@$amount $disk_path@l_e@"
  fi
done`
task=0
bak=$disk_data
result=$(echo $bak | grep "@l_e@")
while [[ "$result" != "" ]];
do 
  left=${bak%%@l_e@*}
  bak=${bak#*@l_e@}
  amount=${left%% *}
  amount=${amount#*@l_s@}
  task=$(echo "$task+$amount"|bc)
  result=$(echo $bak | grep "@l_e@")
done
task3=$task

disk_nvme=`df -h|grep '/nvme*' |awk '{print $4,$6}'|while read line
do
  value=0
  disk_size=${line%% *}
  disk_path=${line#* }
  unit=${disk_size:0-1}
  if [ "$unit" == "G" ];
    then
      value=${disk_size%%$unit*}
  fi
  if [ "$unit" == "T" ];
    then
      value=${disk_size%%$unit*}
      value=$(echo "$value * 1000"|bc)
      value=${value%%.*}
  fi
  if [ "$value" -gt 0 ];
  then 
      amount=$(echo "$value/$plot_size2"|bc)
      amount=${amount%%.*}
  else
    amount=0
  fi
  amount_ping=$(ps -ef |grep 'plots create'|grep "$disk_path "|wc -l)
  amount_ping=$(echo "$amount_ping/2"|bc)
  amount_ping=${amount_ping%%.*}


  if [ "$amount" -gt "$amount_ping" ];
  then
    amount=$(echo "$amount-$amount_ping"|bc)  
    echo "@l_s@$amount $disk_path@l_e@"
  fi
done`
task=0
bak=$disk_nvme
result=$(echo $bak | grep "@l_e@")
while [[ "$result" != "" ]];
do 
  left=${bak%%@l_e@*}
  bak=${bak#*@l_e@}
  amount=${left%% *}
  amount=${amount#*@l_s@}
  task=$(echo "$task+$amount"|bc)
  result=$(echo $bak | grep "@l_e@")
done
task4=$task

task1=$(echo "$cpu_total/$cpu_unit"|bc)
task1=${task1%%.*}

task2=$(echo "$memory_total/$memory_unit"|bc)
task2=${task2%%.*}
#echo "$task1---$task2---$task3---$task4"

task=$task1
if [ "$task2" -lt "$task"  ];
then
  task=$task2
fi
if [ "$task3" -lt "$task"  ];
then 
  task=$task3
fi
if [ "$task4" -lt "$task"  ];
then 
  task=$task4
fi
#echo $task
if [ "$task" = "0" ];
  then
    echo "{'error_no':200}"
fi

bak=$disk_nvme
bak0=$bak
total=0
level=0
path=""
result=$(echo $bak | grep "@l_e@")
for((i=1;i<2;i++));
do 
  if [ "$result" != "" ];
    then
      i=0
      left=${bak%%@l_e@*}
      bak=${bak#*@l_e@}
      amount=${left%% *}
      amount=${amount#*@l_s@}
      if [ "$level" -lt "$amount" ];
      then
        p=${left#* }
        path="$path$p,"
        total=$(echo "$total+1"|bc)
      fi
    else
      if [ "$total" -lt "$task" ];
      then
        i=0
        level=$(echo "$level+1"|bc)
        bak=$bak0
      fi
  fi
  result=$(echo $bak | grep "@l_e@")

done
path_nvme=$path
#echo $path_nvme

bak=$disk_data
bak0=$bak
total=0
level=0
path=""
result=$(echo $bak | grep "@l_e@")
for((i=1;i<2;i++));
do 
  if [ "$result" != "" ];
    then
      i=0
      left=${bak%%@l_e@*}
      bak=${bak#*@l_e@}
      amount=${left%% *}
      amount=${amount#*@l_s@}
      if [ "$level" -lt "$amount" ];
      then
        p=${left#* }
        path="$path$p,"
        total=$(echo "$total+1"|bc)
      fi
    else
      if [ "$total" -lt "$task" ];
      then
        i=0
        level=$(echo "$level+1"|bc)
        bak=$bak0
      fi
  fi
  result=$(echo $bak | grep "@l_e@")

done
path_data=$path
#echo $path_data

bak1=$path_data
bak2=$path_nvme
for((i=0;i<$task;i++));
do
  for((j=0;j<$i;j++));
  do
    bak1=${bak1#*,}
    bak2=${bak2#*,}
  done
  data=${bak1%%,*}
  nvme=${bak2%%,*}
  exec nohup /usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia plots create -$1 -n1 -t$nvme -2$nvme -d$data -b$memory_unit -u128 -r$cpu_unit -f$2 -p$3>/dev/null 2>&1 &
  #echo "/usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia plots create -$1 -n1 -t$nvme -2$nvme -d$data -b$memory_unit -u128 -r$cpu_unit -f$2 -p$3"
done
