import com.google.common.flogger.FluentLogger;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import java.io.IOException;

public class GreeterServiceRunner {

  private int port = 9090;
  private Server server;
  private final FluentLogger logger = FluentLogger.forEnclosingClass();

  private void start() throws IOException {

    server = ServerBuilder.forPort(port)
        .addService(new GreeterServiceImpl())
        .build()
        .start();
    logger.atInfo().log("Server started, listening on " + port);
    Runtime.getRuntime().addShutdownHook(new Thread() {
      @Override
      public void run() {
        logger.atInfo().log("*** shutting down gRPC server since JVM is shutting down");
        stopService();
        logger.atInfo().log("*** server shut down");
      }
    });
  }

  private void stopService() {
    if (server != null) {
      server.shutdown();
    }
  }

  private void blockUntilShutdown() throws InterruptedException {
    if (server != null) {
      server.awaitTermination();
    }
  }

  public static void main(String[] args) throws IOException, InterruptedException {
    final GreeterServiceRunner server = new GreeterServiceRunner();
    server.start();
    server.blockUntilShutdown();
  }
}
