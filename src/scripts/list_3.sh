#!/bin/sh
offer=1
if [ ! -n "$1" ];
then
  page=1
else
  page=$1
fi
if [ $page -eq 1 ];
then
  limit=1
else
  limit=`expr $page - 1`
  limit=`expr $limit \* $offer`
  limit=`expr $limit + 1`
fi
json="{'msg_list':["
file='tem.txt'
df |grep '/data*'  | tail -n "+$limit" | head -n $offer |while read line
do
  num=${line##*/data}
  dir="/data$num"
  num1=$(find $dir -name plot*.plot |wc -l)
  num2=$(find $dir -name plot-**.plot|xargs du -ch|tail -n 1)
  num2=${num2%total*}
  echo "'$dir|$num1|$num2',"

done > $file
msg_list=$(cat $file)
if [ '$msg_list' = '' ]
then
  json="$json]"
else
  msg_list=${msg_list:0:-1}
  json="$json$msg_list]"
fi
json="$json]}"
echo $json
