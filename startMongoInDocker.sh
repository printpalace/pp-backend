#!/bin/bash

CONTAINER="pp-mongo"
DATADIR="dbdata"

cd `dirname $0`

RUNNING=$(docker inspect --format="{{ .State.Running }}" $CONTAINER 2>/dev/null)

if [ $? -eq 1 ]; then
  echo "$CONTAINER container does not exist. Will create docker container"

  if [ ! -d $DATADIR ]; then
    mkdir $DATADIR
  fi

  docker run --name $CONTAINER -v ${DATADIR}:/data/db -p 27017:27017 -d mongo
elif [ "$RUNNING" == "false" ]; then
  echo "$CONTAINER container exists but stopped. Will start docker container"
  docker start $CONTAINER
else
  echo "$CONTAINER container is running"
fi
