#!/bin/sh
offer=10
home=$(env | grep ^HOME= | cut -c 6-)
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
file=$home/tem.txt
ps -ef |grep 'chia plots create' | grep -v "grep" | awk '$4==0  {print $2,$11}'  | tail -n "+$limit" | head -n $offer |while read line
do
  #echo $line  
  pid=${line%% -*}
  knum=${line#* -}
  echo "'$knum||25|$pid',"
done > $file
msg_list=$(cat $file)
#echo $msg_list
if [ "$msg_list" = "" ]
then
  json="$json"
else
  msg_list=${msg_list:0:-1}
  json="$json$msg_list"

fi
json="$json}]"
echo $json
