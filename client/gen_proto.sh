#!/usr/bin/env bash

protoc -I=../src/ ../src/main/proto/helloworld.proto --js_out=import_style=commonjs:./generated --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./generated
