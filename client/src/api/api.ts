import { SnowcastClient } from "../model/snowcast_grpc_web_pb"
import { concatTypedArrays } from "../utils/array";
import { MessageDisplay } from "../App";
import { messageType, fileTag } from "../model/model"

const client = new SnowcastClient("http://localhost:3333", null, null)
const CHUNK_SIZE = 1024

export async function sayHello(userId: string, addToMsgList: (m: MessageDisplay) => void) {
      const request = new proto.snowcast.HelloRequest();
      request.setUserid(userId)
      const stream = client.sayHello(request, null)

      let buf = new Uint8Array(0)

      stream.on("data", async (data: any) => {

            if (data.getMsgtype() == messageType.TEXT) {
                  addToMsgList({ From: data.getFrom(), MsgType: messageType.TEXT, Text: data.getStringmsg() })

            } else if (data.getMsgtype() == messageType.SONG) {
                  {
                        if (data.getTag() == fileTag.START) {
                              buf = new Uint8Array(0)
                        }
                        // console.log(data)
                        buf = concatTypedArrays(buf, data.getFilecontent())

                        if (data.getTag() == fileTag.END) {
                              console.log(buf.length)
                              const audioCtx = new AudioContext();
                              const source = new AudioBufferSourceNode(audioCtx)
                              source.buffer = await audioCtx.decodeAudioData(buf.buffer)
                              console.log(source.buffer.duration)
                              source.connect(audioCtx.destination)
                              source.start()
                              // addToMsgList({ From: data.getFrom(), MsgType: messageType.SONG, Music: source })

                        }
                  }

            } else if (data.getMsgtype() == messageType.TEXTFILE) {
                  console.log(data)
                  if (data.getTag() == fileTag.START) {
                        buf = new Uint8Array(0)
                  }

                  buf = concatTypedArrays(buf, data.getFilecontent())
                  if (data.getTag() == fileTag.END) {
                        addToMsgList({ From: data.getFrom(), MsgType: messageType.TEXTFILE, Text: data.getStringmsg(), TextFile: buf.toString() })

                  }
            }
      }
      );

      stream.on("status", (status: any) => {
            console.log(status.code, status.details, status.metadata);
      });

      stream.on("end", async function () {
            console.log('Stream ended')
      });
}

export async function broadcastMessage(userId: string, msg: string) {
      const message = new proto.snowcast.Message
      message.setFrom(userId)
      message.setMsgtype(0)
      message.setStringmsg(msg)
      // message.setTime(Date.now())

      client.broadcastMessage(message, null, (err) => {
            if (err) console.log(err)
      })
}

export async function broadcastFile(userId: string, file: File, msgType: messageType) {

      for (let start = 0; start < file.size; start += CHUNK_SIZE) {
            const buffer = file.slice(start, Math.min(start + CHUNK_SIZE, file.size))
            const buf = await buffer.arrayBuffer()
            const bufArray = new Uint8Array(buf)

            const message = new proto.snowcast.Message
            message.setFrom(userId)
            message.setMsgtype(msgType)
            message.setFilecontent(bufArray)
            message.setStringmsg(file.name)
            if (start == 0) {
                  message.setTag(fileTag.START)
            } else if (start + CHUNK_SIZE >= file.size) {
                  message.setTag(fileTag.END)
            } else {
                  message.setTag(fileTag.UNRECOGNIZED)
            }

            client.broadcastMessage(message, null, (err, response) => {
                  console.log(start)
                  if (err) console.log(err)
            })
      }
}
