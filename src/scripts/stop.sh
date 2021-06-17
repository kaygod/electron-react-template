#!/bin/sh
ps -ef |grep 'chia plots create' | grep -v "grep" | awk '$4==0  {print $2}' | xargs kill -9
df |grep '/nvme*' |while read line
do
  num=${line##*/nvme}
  dir="/nvme$num"
  rm $dir/plot-*.tmp
done
