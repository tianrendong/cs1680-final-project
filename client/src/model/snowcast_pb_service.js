// package: snowcast
// file: model/snowcast.proto

var model_snowcast_pb = require("../model/snowcast_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Snowcast = (function () {
  function Snowcast() {}
  Snowcast.serviceName = "snowcast.Snowcast";
  return Snowcast;
}());

Snowcast.Connect = {
  methodName: "Connect",
  service: Snowcast,
  requestStream: false,
  responseStream: true,
  requestType: model_snowcast_pb.User,
  responseType: model_snowcast_pb.MessageUpdate
};

Snowcast.GetPlaylist = {
  methodName: "GetPlaylist",
  service: Snowcast,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: model_snowcast_pb.Playlist
};

Snowcast.SendMessage = {
  methodName: "SendMessage",
  service: Snowcast,
  requestStream: false,
  responseStream: false,
  requestType: model_snowcast_pb.Message,
  responseType: google_protobuf_empty_pb.Empty
};

Snowcast.FetchMessages = {
  methodName: "FetchMessages",
  service: Snowcast,
  requestStream: false,
  responseStream: false,
  requestType: model_snowcast_pb.FetchRequest,
  responseType: model_snowcast_pb.Messages
};

Snowcast.FetchMusic = {
  methodName: "FetchMusic",
  service: Snowcast,
  requestStream: false,
  responseStream: true,
  requestType: model_snowcast_pb.Music,
  responseType: model_snowcast_pb.FileChunk
};

exports.Snowcast = Snowcast;

function SnowcastClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SnowcastClient.prototype.connect = function connect(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Snowcast.Connect, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

SnowcastClient.prototype.getPlaylist = function getPlaylist(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Snowcast.GetPlaylist, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

SnowcastClient.prototype.sendMessage = function sendMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Snowcast.SendMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

SnowcastClient.prototype.fetchMessages = function fetchMessages(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Snowcast.FetchMessages, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

SnowcastClient.prototype.fetchMusic = function fetchMusic(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Snowcast.FetchMusic, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.SnowcastClient = SnowcastClient;

