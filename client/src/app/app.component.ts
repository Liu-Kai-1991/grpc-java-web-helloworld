import {Component} from '@angular/core';
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


// server streaming call
let streamRequest = new RepeatHelloRequest();
streamRequest.setName('Kai');
streamRequest.setCount(5);

let stream = client.sayRepeatHello(streamRequest, {});
stream.on('data', (response) => {
  console.log(response.getMessage());
});


// deadline exceeded
let deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 1);

client.sayHelloAfterDelay(request, {deadline: deadline.getTime()},
  (err, response) => {
    console.log('Got error, code = ' + err.code +
      ', message = ' + err.message);
  });


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
}


