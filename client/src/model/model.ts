export enum messageType {
      TEXT = 0,
      SONG = 1,
      TEXTFILE = 2,
      UNRECOGNIZED = -1,
}

export enum fileTag {
      START = 0,
      END = 1,
      UNRECOGNIZED = -1,
}

export interface HelloRequest {
      userId: string;
}

export interface Message {
      from: string;
      msgType: messageType;
      stringMsg?: string | undefined;
      fileContent?: Uint8Array | undefined;
      time: Date | undefined;
      tag?: fileTag | undefined;
}