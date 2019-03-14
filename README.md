# gRPC-Web Hello World with java backend and Angular front-end

Follow [offical grpc repo](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld) for
envoy and docker settings.

This project use java to implement the hello world server, and use Angular as front end server. 

The [README.md](https://github.com/Liu-Kai-1991/grpc-java-web-helloworld/blob/master/client/README.md) in client
directory explains what should be the adaption in Angular side.

## Run

Java back-end

```$xslt
gradle build installDist
./build/install/grpc-java-web-helloworld/bin/server
```

Envoy

`sudo ./run_envoy.sh`

Angular front-end
```$xslt
cd client
npm install
ng build
ng serve
```




