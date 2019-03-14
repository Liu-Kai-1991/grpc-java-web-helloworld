import { Component } from '@angular/core';
import {HelloRequest, HelloReply, RepeatHelloRequest} from '../../generated/main/proto/helloworld_pb'
import {GreeterClient} from '../../generated/main/proto/helloworld_grpc_web_pb'


const client = new GreeterClient('http://' + window.location.hostname + ':8080',
  null, null);

// simple unary call
let request = new HelloRequest();
request.setName('World');

client.sayHello(request, {}, (err, response) => {
  console.log(response.getMessage());
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
}


