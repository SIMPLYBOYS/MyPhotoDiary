#! /bin/sh

NODE_ENV=production
DAEMON="node /home/ec2-user/MyPhotoDiary/cluster.js"
NAME=My_PhotoDiary
DESC=My_PhotoDiary
PIDFILE="/home/ec2-user/MyPhotoDiary/myPhotoDiary.pid"
KILL_P=$(cat $PIDFILE);

echo $0

kill $KILL_P
 



