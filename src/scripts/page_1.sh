#!/bin/sh
p_ing=$(ps -ef |grep 'chia plots create' | grep -v "grep" | awk '$4==0'|wc -l )
p_complete=$(find /data* -name plot*.plot |wc -l)
#echo "$p_complete|$p_ing"
echo "{'p_complete':'$p_complete','p_ing':'$p_ing'}"
echo "{'p_complete':'$p_complete','p_ing':'$p_ing'}"
echo "{'p_complete':'$p_complete','p_ing':'$p_ing'}"
