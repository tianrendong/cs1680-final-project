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
 *   !proto.snowcast.WelcomeReply>}
 */
const methodDescriptor_Snowcast_SayHello = new grpc.web.MethodDescriptor(
  '/snowcast.Snowcast/SayHello',
  grpc.web.MethodType.UNARY,
  proto.snowcast.HelloRequest,
  proto.snowcast.WelcomeReply,
  /**
   * @param {!proto.snowcast.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.snowcast.WelcomeReply.deserializeBinary
);


/**
 * @param {!proto.snowcast.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.snowcast.WelcomeReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.WelcomeReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/snowcast.Snowcast/SayHello',
      request,
      metadata || {},
      methodDescriptor_Snowcast_SayHello,
      callback);
};


/**
 * @param {!proto.snowcast.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.snowcast.WelcomeReply>}
 *     Promise that resolves to the response
 */
proto.snowcast.SnowcastPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/snowcast.Snowcast/SayHello',
      request,
      metadata || {},
      methodDescriptor_Snowcast_SayHello);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.snowcast.PlaySongRequest,
 *   !proto.snowcast.PlaySongReply>}
 */
const methodDescriptor_Snowcast_PlaySong = new grpc.web.MethodDescriptor(
  '/snowcast.Snowcast/PlaySong',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.snowcast.PlaySongRequest,
  proto.snowcast.PlaySongReply,
  /**
   * @param {!proto.snowcast.PlaySongRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.snowcast.PlaySongReply.deserializeBinary
);


/**
 * @param {!proto.snowcast.PlaySongRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.PlaySongReply>}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastClient.prototype.playSong =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/snowcast.Snowcast/PlaySong',
      request,
      metadata || {},
      methodDescriptor_Snowcast_PlaySong);
};


/**
 * @param {!proto.snowcast.PlaySongRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.snowcast.PlaySongReply>}
 *     The XHR Node Readable Stream
 */
proto.snowcast.SnowcastPromiseClient.prototype.playSong =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/snowcast.Snowcast/PlaySong',
      request,
      metadata || {},
      methodDescriptor_Snowcast_PlaySong);
};


module.exports = proto.snowcast;

