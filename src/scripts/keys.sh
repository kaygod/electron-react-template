#!/bin/sh
msg=$(/usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia keys show|tail -n +5 | head -n 1)
farmer_keys=${msg#*: }
msg=$(/usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia keys show|tail -n +6 | head -n 1)
pool_keys=${msg#*: }
echo "{'farmer_keys':'$farmer_keys','pool_keys':'$pool_keys'}"
