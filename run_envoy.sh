#!/usr/bin/env bash

docker build -t helloworld/envoy -f ./envoy.Dockerfile .
docker run -d -p 8080:8080 --network=host helloworld/envoy