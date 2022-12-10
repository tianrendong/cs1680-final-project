/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Empty } from "../google/protobuf/empty";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "snowcast";

export enum MessageType {
  MESSAGE = 0,
  MUSIC = 1,
  UNRECOGNIZED = -1,
}

export function messageTypeFromJSON(object: any): MessageType {
  switch (object) {
    case 0:
    case "MESSAGE":
      return MessageType.MESSAGE;
    case 1:
    case "MUSIC":
      return MessageType.MUSIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MessageType.UNRECOGNIZED;
  }
}

export function messageTypeToJSON(object: MessageType): string {
  switch (object) {
    case MessageType.MESSAGE:
      return "MESSAGE";
    case MessageType.MUSIC:
      return "MUSIC";
    case MessageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface User {
  userId: string;
}

export interface Music {
  name: string;
}

export interface Notification {
  type: MessageType;
  latestMsg?: number | undefined;
}

export interface Message {
  sender: string;
  type: MessageType;
  /** message can be either text or song name */
  message: string;
  time: Date | undefined;
}

export interface FetchRequest {
  startIndex: number;
}

export interface Messages {
  messages: Message[];
}

export interface FileChunk {
  fileName: string;
  chunk: Uint8Array;
}

function createBaseUser(): User {
  return { userId: "" };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return { userId: isSet(object.userId) ? String(object.userId) : "" };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseMusic(): Music {
  return { name: "" };
}

export const Music = {
  encode(message: Music, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Music {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMusic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Music {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: Music): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Music>, I>>(object: I): Music {
    const message = createBaseMusic();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseNotification(): Notification {
  return { type: 0, latestMsg: undefined };
}

export const Notification = {
  encode(message: Notification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.latestMsg !== undefined) {
      writer.uint32(16).int32(message.latestMsg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Notification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.latestMsg = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Notification {
    return {
      type: isSet(object.type) ? messageTypeFromJSON(object.type) : 0,
      latestMsg: isSet(object.latestMsg) ? Number(object.latestMsg) : undefined,
    };
  },

  toJSON(message: Notification): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = messageTypeToJSON(message.type));
    message.latestMsg !== undefined && (obj.latestMsg = Math.round(message.latestMsg));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Notification>, I>>(object: I): Notification {
    const message = createBaseNotification();
    message.type = object.type ?? 0;
    message.latestMsg = object.latestMsg ?? undefined;
    return message;
  },
};

function createBaseMessage(): Message {
  return { sender: "", type: 0, message: "", time: undefined };
}

export const Message = {
  encode(message: Message, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        case 3:
          message.message = reader.string();
          break;
        case 4:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      type: isSet(object.type) ? messageTypeFromJSON(object.type) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.type !== undefined && (obj.type = messageTypeToJSON(message.type));
    message.message !== undefined && (obj.message = message.message);
    message.time !== undefined && (obj.time = message.time.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.sender = object.sender ?? "";
    message.type = object.type ?? 0;
    message.message = object.message ?? "";
    message.time = object.time ?? undefined;
    return message;
  },
};

function createBaseFetchRequest(): FetchRequest {
  return { startIndex: 0 };
}

export const FetchRequest = {
  encode(message: FetchRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startIndex !== 0) {
      writer.uint32(8).int32(message.startIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FetchRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFetchRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startIndex = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FetchRequest {
    return { startIndex: isSet(object.startIndex) ? Number(object.startIndex) : 0 };
  },

  toJSON(message: FetchRequest): unknown {
    const obj: any = {};
    message.startIndex !== undefined && (obj.startIndex = Math.round(message.startIndex));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FetchRequest>, I>>(object: I): FetchRequest {
    const message = createBaseFetchRequest();
    message.startIndex = object.startIndex ?? 0;
    return message;
  },
};

function createBaseMessages(): Messages {
  return { messages: [] };
}

export const Messages = {
  encode(message: Messages, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messages) {
      Message.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Messages {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessages();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Message.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Messages {
    return { messages: Array.isArray(object?.messages) ? object.messages.map((e: any) => Message.fromJSON(e)) : [] };
  },

  toJSON(message: Messages): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) => e ? Message.toJSON(e) : undefined);
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Messages>, I>>(object: I): Messages {
    const message = createBaseMessages();
    message.messages = object.messages?.map((e) => Message.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFileChunk(): FileChunk {
  return { fileName: "", chunk: new Uint8Array() };
}

export const FileChunk = {
  encode(message: FileChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fileName !== "") {
      writer.uint32(10).string(message.fileName);
    }
    if (message.chunk.length !== 0) {
      writer.uint32(18).bytes(message.chunk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileName = reader.string();
          break;
        case 2:
          message.chunk = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileChunk {
    return {
      fileName: isSet(object.fileName) ? String(object.fileName) : "",
      chunk: isSet(object.chunk) ? bytesFromBase64(object.chunk) : new Uint8Array(),
    };
  },

  toJSON(message: FileChunk): unknown {
    const obj: any = {};
    message.fileName !== undefined && (obj.fileName = message.fileName);
    message.chunk !== undefined &&
      (obj.chunk = base64FromBytes(message.chunk !== undefined ? message.chunk : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FileChunk>, I>>(object: I): FileChunk {
    const message = createBaseFileChunk();
    message.fileName = object.fileName ?? "";
    message.chunk = object.chunk ?? new Uint8Array();
    return message;
  },
};

export interface Snowcast {
  Connect(request: User): Observable<Notification>;
  SendMessage(request: Message): Promise<Empty>;
  FetchMessages(request: FetchRequest): Promise<Messages>;
  SendMusic(request: Music): Promise<Empty>;
  FetchMusic(request: Music): Observable<FileChunk>;
}

export class SnowcastClientImpl implements Snowcast {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "snowcast.Snowcast";
    this.rpc = rpc;
    this.Connect = this.Connect.bind(this);
    this.SendMessage = this.SendMessage.bind(this);
    this.FetchMessages = this.FetchMessages.bind(this);
    this.SendMusic = this.SendMusic.bind(this);
    this.FetchMusic = this.FetchMusic.bind(this);
  }
  Connect(request: User): Observable<Notification> {
    const data = User.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "Connect", data);
    return result.pipe(map((data) => Notification.decode(new _m0.Reader(data))));
  }

  SendMessage(request: Message): Promise<Empty> {
    const data = Message.encode(request).finish();
    const promise = this.rpc.request(this.service, "SendMessage", data);
    return promise.then((data) => Empty.decode(new _m0.Reader(data)));
  }

  FetchMessages(request: FetchRequest): Promise<Messages> {
    const data = FetchRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "FetchMessages", data);
    return promise.then((data) => Messages.decode(new _m0.Reader(data)));
  }

  SendMusic(request: Music): Promise<Empty> {
    const data = Music.encode(request).finish();
    const promise = this.rpc.request(this.service, "SendMusic", data);
    return promise.then((data) => Empty.decode(new _m0.Reader(data)));
  }

  FetchMusic(request: Music): Observable<FileChunk> {
    const data = Music.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "FetchMusic", data);
    return result.pipe(map((data) => FileChunk.decode(new _m0.Reader(data))));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
