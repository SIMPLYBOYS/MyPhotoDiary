#! /bin/sh

NODE_ENV=production
DAEMON="node /home/ec2-user/MyPhotoDiary/cluster.js"
NAME=My_PhotoDiary
DESC=My_PhotoDiary
PIDFILE="/home/ec2-user/MyPhotoDiary/myPhotoDiary.pid"

case "$1" in
  start)
        echo "Starting $DESC: "
                nohup $DAEMON > /dev/null &
        echo $! > $PIDFILE
        echo "$NAME. "
                    ;;  
  stop)
        echo "Stoping $DESC: "
              pid=`cat $PIDFILE`
        echo $pid
        rm $PIDFILE
        echo "$NAME. stop "
        kill $pid            
                    ;;
esac

exit 0
