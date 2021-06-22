#!/bin/sh
ps -ef |grep 'chia plots create' | grep -v "grep"|awk '{print $2}' | xargs kill -9 >/dev/null 2>&1 &
df |grep '/nvme*' |while read line
do
  num=${line##*/nvme}
  dir="/nvme$num"
  rm $dir/plot-*.tmp>/dev/null 2>&1 &
done
