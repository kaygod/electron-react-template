#!/bin/sh
offer=10
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
find /data* -name plot*.plot | tail -n "+$limit" | head -n $offer |while read line
do
  file=${line##*/}
  msg=${file:5:3}
  echo "'$msg|$file|101|$line',"
done > $file
msg_list=$(cat $file)
if [ '$msg_list' = '' ]
then
  json="$json"
else
  msg_list=${msg_list:0:-1}
  json="$json$msg_list"
fi
json="$json]}"
echo $json
