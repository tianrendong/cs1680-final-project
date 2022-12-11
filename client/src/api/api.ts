import { SnowcastClient, Status } from "../model/snowcast_pb_service"
import { User, MessageUpdate, FetchRequest, Messages, Playlist, Message, MessageType, Music, FileChunk } from "../model/snowcast_pb"
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import { concatTypedArrays } from "../utils/array";

const client = new SnowcastClient("http://localhost:3333")

export function connect(userId: string, handleMessageUpdate: (m: MessageUpdate) => void) {
      const request = new User()
      request.setUserid(userId)
      const stream = client.connect(request, null)

      stream.on("data", (update: MessageUpdate) => {
            handleMessageUpdate(update)
      }
      );

      stream.on("status", (status: any) => {
            console.log(status.code, status.details, status.metadata);
      });

      stream.on("end", async function () {
            console.log('Stream ended')
      });
}

export function getPlaylist(): Promise<Music[]> {
      const request = new google_protobuf_empty_pb.Empty
      return new Promise((resolve, reject) => {
            client.getPlaylist(request, null, (err, response) => {
                  if (err) reject(err)
                  resolve(response ? response.getPlaylistList() : [])
            })
      })
}


export function sendMessage(user: string, messageType: typeof MessageType.MESSAGE | typeof MessageType.MUSIC, message: string) {
      const request = new Message()
      request.setSender(user)
      request.setType(messageType)
      request.setMessage(message)
      client.sendMessage(request, null, (err) => {
            if (err) console.log(err)
      })
}

export async function fetchMessages(startIndex: number): Promise<Message[]> {
      const request = new FetchRequest()
      request.setStartindex(startIndex)
      return new Promise((resolve, reject) => {
            client.fetchMessages(request, null, async (err, response) => {
                  if (err) reject(err)
                  resolve(response ? response.getMessagesList() : [])
            })
      })

}

export async function fetchMusic(music: string): Promise<AudioBufferSourceNode> {
      const request = new Music()
      request.setName(music)
      return new Promise<AudioBufferSourceNode>((resolve) => {
            const stream = client.fetchMusic(request, null)

            let buf = new Uint8Array(0)

            stream.on("data", (fileChunk: FileChunk) => {
                  buf = concatTypedArrays(buf, fileChunk.getChunk() as Uint8Array)
            }
            );

            stream.on('status', (status: Status) => {
                  console.log(status.code);
                  console.log(status.details);
                  console.log(status.metadata);
            });

            stream.on("end", async function () {
                  const audioCtx = new AudioContext();
                  const source = new AudioBufferSourceNode(audioCtx)
                  source.buffer = await audioCtx.decodeAudioData(buf.buffer)
                  source.connect(audioCtx.destination)
                  resolve(source)
            });
      })

}
