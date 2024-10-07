const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/greet.proto';

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const greet = grpc.loadPackageDefinition(packageDefinition);

function sayHello(call, callback) {
  callback(null, { message: 'Hello, ' + call.request.name + '!' });
}

const server = new grpc.Server();
server.addService(greet.Greeter.service, { sayHello });
// home wifi
// server.bindAsync('192.168.0.102:50051', grpc.ServerCredentials.createInsecure(), (error)=> {

// vidya hotspot, emulator
// server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error)=> {


server.bindAsync('50051', grpc.ServerCredentials.createInsecure(), (error) => {
  server.start();
  // console.log('gRPC server running on 127.0.0.1:50051');
  console.log('gRPC server running on https://rest-server-6fqe.onrender.com:50051');
});


