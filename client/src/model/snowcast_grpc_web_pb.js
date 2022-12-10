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
 *   !proto.snowcast.User,
 *   !proto.snowcast.Notification>}
 */
const methodDescriptor_Snowcast_Connect = new grpc.web.MethodDescriptor(
  '/snowcast.Snowcast/Connect',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.snowcast.User,
  proto.snowcast.Notification,
  /**
   * @param {!proto.snowcast.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.snowcast.Notification.deserializeBinary
);


/**
 * @param {!proto.snowcast.User} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.Notification>}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastClient.prototype.connect =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/snowcast.Snowcast/Connect',
      request,
      metadata || {},
      methodDescriptor_Snowcast_Connect);
};


/**
 * @param {!proto.snowcast.User} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.Notification>}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastPromiseClient.prototype.connect =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/snowcast.Snowcast/Connect',
      request,
      metadata || {},
      methodDescriptor_Snowcast_Connect);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.snowcast.Message,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Snowcast_SendMessage = new grpc.web.MethodDescriptor(
  '/snowcast.Snowcast/SendMessage',
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
proto.snowcast.SnowcastClient.prototype.sendMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/snowcast.Snowcast/SendMessage',
      request,
      metadata || {},
      methodDescriptor_Snowcast_SendMessage,
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
proto.snowcast.SnowcastPromiseClient.prototype.sendMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/snowcast.Snowcast/SendMessage',
      request,
      metadata || {},
      methodDescriptor_Snowcast_SendMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.snowcast.FetchRequest,
 *   !proto.snowcast.Messages>}
 */
const methodDescriptor_Snowcast_FetchMessages = new grpc.web.MethodDescriptor(
  '/snowcast.Snowcast/FetchMessages',
  grpc.web.MethodType.UNARY,
  proto.snowcast.FetchRequest,
  proto.snowcast.Messages,
  /**
   * @param {!proto.snowcast.FetchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.snowcast.Messages.deserializeBinary
);


/**
 * @param {!proto.snowcast.FetchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.snowcast.Messages)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.Messages>|undefined}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastClient.prototype.fetchMessages =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/snowcast.Snowcast/FetchMessages',
      request,
      metadata || {},
      methodDescriptor_Snowcast_FetchMessages,
      callback);
};


/**
 * @param {!proto.snowcast.FetchRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.snowcast.Messages>}
 *     Promise that resolves to the response
 */
proto.snowcast.SnowcastPromiseClient.prototype.fetchMessages =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/snowcast.Snowcast/FetchMessages',
      request,
      metadata || {},
      methodDescriptor_Snowcast_FetchMessages);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.snowcast.Music,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Snowcast_SendMusic = new grpc.web.MethodDescriptor(
  '/snowcast.Snowcast/SendMusic',
  grpc.web.MethodType.UNARY,
  proto.snowcast.Music,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.snowcast.Music} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.snowcast.Music} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastClient.prototype.sendMusic =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/snowcast.Snowcast/SendMusic',
      request,
      metadata || {},
      methodDescriptor_Snowcast_SendMusic,
      callback);
};


/**
 * @param {!proto.snowcast.Music} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.snowcast.SnowcastPromiseClient.prototype.sendMusic =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/snowcast.Snowcast/SendMusic',
      request,
      metadata || {},
      methodDescriptor_Snowcast_SendMusic);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.snowcast.Music,
 *   !proto.snowcast.FileChunk>}
 */
const methodDescriptor_Snowcast_FetchMusic = new grpc.web.MethodDescriptor(
  '/snowcast.Snowcast/FetchMusic',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.snowcast.Music,
  proto.snowcast.FileChunk,
  /**
   * @param {!proto.snowcast.Music} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.snowcast.FileChunk.deserializeBinary
);


/**
 * @param {!proto.snowcast.Music} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.FileChunk>}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastClient.prototype.fetchMusic =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/snowcast.Snowcast/FetchMusic',
      request,
      metadata || {},
      methodDescriptor_Snowcast_FetchMusic);
};


/**
 * @param {!proto.snowcast.Music} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.FileChunk>}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastPromiseClient.prototype.fetchMusic =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/snowcast.Snowcast/FetchMusic',
      request,
      metadata || {},
      methodDescriptor_Snowcast_FetchMusic);
};


module.exports = proto.snowcast;

