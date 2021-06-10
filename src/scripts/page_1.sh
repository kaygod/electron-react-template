#!/bin/sh
file_name='1.txt'
p_ing=$(ps -ef |grep 'chia plots create' |grep -v "grep"|wc -l )
p_ing=`expr $p_ing / 2`
p_complete=$(find /data* -name plot*.plot |wc -l)
echo "$p_complete|$p_ing">$file_name

ps -ef |grep 'chia plots create' |grep -v 'grep' |while read line;do
  right=${line#*create -}
  msg=${right:0:3}
  echo "$msg||25">>$file_name
done

find /data* -name plot*.plot |while read line;do
  file=${line##*/}
  msg=${file:5:3}
 echo "$msg|$file|101">>$file_name
done

echo $(cat 1.txt)
