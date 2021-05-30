#!/bin/bash

echo -e "hostname:\t `hostname`\r\n"
echo -e "OScore:\t\t `uname -a`\r\n"
echo -e "CPUInfo:\t  `grep "model name" /proc/cpuinfo | awk -F: '{print $2}' ` \r\n"
echo -e "CPUMHz:\t\t `grep "MHz" /proc/cpuinfo | awk -F: '{print $2}' ` \r\n"
echo -e "MemTotal:\t `free -m | awk '$1=="Mem:" {print $2}' ` "
