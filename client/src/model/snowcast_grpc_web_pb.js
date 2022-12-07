/**
 * @fileoverview gRPC-Web generated client stub for snowcast
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.snowcast = require('./snowcast_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.snowcast.SnowcastClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.snowcast.SnowcastPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.snowcast.HelloRequest,
 *   !proto.snowcast.Message>}
 */
const methodDescriptor_Snowcast_SayHello = new grpc.web.MethodDescriptor(
  '/snowcast.Snowcast/SayHello',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.snowcast.HelloRequest,
  proto.snowcast.Message,
  /**
   * @param {!proto.snowcast.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.snowcast.Message.deserializeBinary
);


/**
 * @param {!proto.snowcast.HelloRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.Message>}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/snowcast.Snowcast/SayHello',
      request,
      metadata || {},
      methodDescriptor_Snowcast_SayHello);
};


/**
 * @param {!proto.snowcast.HelloRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.Message>}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/snowcast.Snowcast/SayHello',
      request,
      metadata || {},
      methodDescriptor_Snowcast_SayHello);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.snowcast.Message,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Snowcast_BroadcastMessage = new grpc.web.MethodDescriptor(
  '/snowcast.Snowcast/BroadcastMessage',
  grpc.web.MethodType.UNARY,
  proto.snowcast.Message,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.snowcast.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.snowcast.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastClient.prototype.broadcastMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/snowcast.Snowcast/BroadcastMessage',
      request,
      metadata || {},
      methodDescriptor_Snowcast_BroadcastMessage,
      callback);
};


/**
 * @param {!proto.snowcast.Message} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.snowcast.SnowcastPromiseClient.prototype.broadcastMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/snowcast.Snowcast/BroadcastMessage',
      request,
      metadata || {},
      methodDescriptor_Snowcast_BroadcastMessage);
};


module.exports = proto.snowcast;

