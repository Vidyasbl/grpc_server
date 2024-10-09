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

const port = process.env.PORT || 4000;
server.bindAsync('0.0.0.0:' + port, grpc.ServerCredentials.createInsecure(), (error) => {
  if (error != null) {
    console.log('error:');
    console.log(error); 
  }
  server.start();
  console.log('gRPC server running on port ' + port);
});


// const express = require('express');
// const app = express();
// const port = process.env.PORT || 4000;

// app.get('/hello/:name', (req, res) => {
//   res.send(`Hello, ${req.params.name}!`);
// });

// app.listen(port, () => {
//   console.log(`REST server running on port ${port}`);
// });
