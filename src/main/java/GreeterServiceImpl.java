import com.google.common.flogger.FluentLogger;
import helloworld.GreeterGrpc.GreeterImplBase;
import helloworld.Helloworld;
import helloworld.Helloworld.HelloReply;
import helloworld.Helloworld.HelloRequest;
import io.grpc.stub.StreamObserver;

public class GreeterServiceImpl extends GreeterImplBase {
  private final FluentLogger logger = FluentLogger.forEnclosingClass();

  @Override
  public void sayHello(HelloRequest request, StreamObserver<HelloReply> responseObserver) {
    logger.atInfo().log(request.toString());
    responseObserver.onNext(
            HelloReply.newBuilder().setMessage("Hello " + request.getName()).build());
    responseObserver.onCompleted();
  }

  @Override
  public void sayRepeatHello(Helloworld.RepeatHelloRequest request, StreamObserver<HelloReply> responseObserver) {
    logger.atInfo().log(request.toString());
    for (int i = 0; i < request.getCount(); i++){
      responseObserver.onNext(
              HelloReply.newBuilder().setMessage(String.format("#%d Hello %s", i+1, request.getName())).build());
    }
    responseObserver.onCompleted();
    super.sayRepeatHello(request, responseObserver);
  }

  @Override
  public void sayHelloAfterDelay(HelloRequest request, StreamObserver<HelloReply> responseObserver) {
    try{
      Thread.sleep(1000L);
    } catch (InterruptedException e){
      Thread.currentThread().interrupt();
    }
    sayHello(request, responseObserver);
  }
}
