import {Component, OnInit} from '@angular/core';
import {
  HelloRequest,
  HelloReply,
  RepeatHelloRequest
} from '../../generated/main/proto/helloworld_pb'
import {GreeterClient} from '../../generated/main/proto/helloworld_grpc_web_pb'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  client = new GreeterClient('http://' + window.location.hostname + ':8080',
    null, null);
  name: string;
  timeOut: number;
  serverResponse: string = "";

  constructor() {
  }

  sendRequest() {
    let request = new HelloRequest();
    request.setName(this.name);
    this.client.sayHello(request, {}, (err, response) => {
      this.serverResponse = this.serverResponse + response.getMessage() + "\n";
    });
    // server streaming call
    let streamRequest = new RepeatHelloRequest();
    streamRequest.setName('Kai');
    streamRequest.setCount(5);

    let stream = this.client.sayRepeatHello(streamRequest, {});
    stream.on('data', (response) => {
      this.serverResponse = this.serverResponse + response.getMessage() + "\n";
    });

    // deadline exceeded
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + this.timeOut);

    this.client.sayHelloAfterDelay(request, {deadline: deadline.getTime()},
      (err, response) => {
        if (err != null) {
          this.serverResponse = this.serverResponse + 'Got error, code = ' + err.code +
            ', message = ' + err.message;
        }
        if (response != null) {
          this.serverResponse = this.serverResponse + response.getMessage() + "\n";
        }
      });
  }

  ngOnInit() {
  }
}


