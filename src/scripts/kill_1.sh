#!/bin/sh
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
  r=$(kill -9 $1 2>&1)
fi
if [ "$r" = "" ]
then
  echo "{'result':1}"
else
  echo "{'result':0,'error':'$r'}"
fi
