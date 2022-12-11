// package: snowcast
// file: model/snowcast.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class User extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    userid: string,
  }
}

export class Playlist extends jspb.Message {
  clearPlaylistList(): void;
  getPlaylistList(): Array<Music>;
  setPlaylistList(value: Array<Music>): void;
  addPlaylist(value?: Music, index?: number): Music;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Playlist.AsObject;
  static toObject(includeInstance: boolean, msg: Playlist): Playlist.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Playlist, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Playlist;
  static deserializeBinaryFromReader(message: Playlist, reader: jspb.BinaryReader): Playlist;
}

export namespace Playlist {
  export type AsObject = {
    playlistList: Array<Music.AsObject>,
  }
}

export class Music extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Music.AsObject;
  static toObject(includeInstance: boolean, msg: Music): Music.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Music, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Music;
  static deserializeBinaryFromReader(message: Music, reader: jspb.BinaryReader): Music;
}

export namespace Music {
  export type AsObject = {
    name: string,
  }
}

export class MessageUpdate extends jspb.Message {
  getLatestmsg(): number;
  setLatestmsg(value: number): void;

  getAnnouncement(): string;
  setAnnouncement(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: MessageUpdate): MessageUpdate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageUpdate;
  static deserializeBinaryFromReader(message: MessageUpdate, reader: jspb.BinaryReader): MessageUpdate;
}

export namespace MessageUpdate {
  export type AsObject = {
    latestmsg: number,
    announcement: string,
  }
}

export class Message extends jspb.Message {
  getSender(): string;
  setSender(value: string): void;

  getType(): MessageTypeMap[keyof MessageTypeMap];
  setType(value: MessageTypeMap[keyof MessageTypeMap]): void;

  getMessage(): string;
  setMessage(value: string): void;

  hasTime(): boolean;
  clearTime(): void;
  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    sender: string,
    type: MessageTypeMap[keyof MessageTypeMap],
    message: string,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class FetchRequest extends jspb.Message {
  getStartindex(): number;
  setStartindex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchRequest): FetchRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchRequest;
  static deserializeBinaryFromReader(message: FetchRequest, reader: jspb.BinaryReader): FetchRequest;
}

export namespace FetchRequest {
  export type AsObject = {
    startindex: number,
  }
}

export class Messages extends jspb.Message {
  clearMessagesList(): void;
  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): void;
  addMessages(value?: Message, index?: number): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Messages.AsObject;
  static toObject(includeInstance: boolean, msg: Messages): Messages.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Messages, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Messages;
  static deserializeBinaryFromReader(message: Messages, reader: jspb.BinaryReader): Messages;
}

export namespace Messages {
  export type AsObject = {
    messagesList: Array<Message.AsObject>,
  }
}

export class FileChunk extends jspb.Message {
  getFilename(): string;
  setFilename(value: string): void;

  getChunk(): Uint8Array | string;
  getChunk_asU8(): Uint8Array;
  getChunk_asB64(): string;
  setChunk(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileChunk.AsObject;
  static toObject(includeInstance: boolean, msg: FileChunk): FileChunk.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileChunk, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileChunk;
  static deserializeBinaryFromReader(message: FileChunk, reader: jspb.BinaryReader): FileChunk;
}

export namespace FileChunk {
  export type AsObject = {
    filename: string,
    chunk: Uint8Array | string,
  }
}

export interface MessageTypeMap {
  MESSAGE: 0;
  MUSIC: 1;
}

export const MessageType: MessageTypeMap;

