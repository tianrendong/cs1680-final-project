// package: snowcast
// file: model/snowcast.proto

import * as model_snowcast_pb from "../model/snowcast_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type SnowcastConnect = {
  readonly methodName: string;
  readonly service: typeof Snowcast;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof model_snowcast_pb.User;
  readonly responseType: typeof model_snowcast_pb.MessageUpdate;
};

type SnowcastGetPlaylist = {
  readonly methodName: string;
  readonly service: typeof Snowcast;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof model_snowcast_pb.Playlist;
};

type SnowcastSendMessage = {
  readonly methodName: string;
  readonly service: typeof Snowcast;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_snowcast_pb.Message;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type SnowcastFetchMessages = {
  readonly methodName: string;
  readonly service: typeof Snowcast;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_snowcast_pb.FetchRequest;
  readonly responseType: typeof model_snowcast_pb.Messages;
};

type SnowcastFetchMusic = {
  readonly methodName: string;
  readonly service: typeof Snowcast;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof model_snowcast_pb.Music;
  readonly responseType: typeof model_snowcast_pb.FileChunk;
};

export class Snowcast {
  static readonly serviceName: string;
  static readonly Connect: SnowcastConnect;
  static readonly GetPlaylist: SnowcastGetPlaylist;
  static readonly SendMessage: SnowcastSendMessage;
  static readonly FetchMessages: SnowcastFetchMessages;
  static readonly FetchMusic: SnowcastFetchMusic;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class SnowcastClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  connect(requestMessage: model_snowcast_pb.User, metadata?: grpc.Metadata): ResponseStream<model_snowcast_pb.MessageUpdate>;
  getPlaylist(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_snowcast_pb.Playlist|null) => void
  ): UnaryResponse;
  getPlaylist(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: model_snowcast_pb.Playlist|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: model_snowcast_pb.Message,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: model_snowcast_pb.Message,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  fetchMessages(
    requestMessage: model_snowcast_pb.FetchRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_snowcast_pb.Messages|null) => void
  ): UnaryResponse;
  fetchMessages(
    requestMessage: model_snowcast_pb.FetchRequest,
    callback: (error: ServiceError|null, responseMessage: model_snowcast_pb.Messages|null) => void
  ): UnaryResponse;
  fetchMusic(requestMessage: model_snowcast_pb.Music, metadata?: grpc.Metadata): ResponseStream<model_snowcast_pb.FileChunk>;
}

