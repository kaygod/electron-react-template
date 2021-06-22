#!/bin/sh
# 已完成删除按钮
if [ ! -n "$1" ];
then
  echo 'Missing parameter'
  exit 0
fi

result=$(echo $1 | grep "plot")
if [ "$result" != "" ]
then
  r=$(rm $1 2>&1)
else
  pid=$1
  ps -ef |grep 'chia plots create' | grep -v "grep" | awk 'BEGIN{parentid="'"$pid"'"}{if ($3==parentid) print $2;}' | xargs kill -9
  r=$(kill -9 $1 2>&1)
fi
if [ "$r" = "" ]
then
  echo "{'result':1}"
else
  echo "{'result':0,'error':'$r'}"
fi
