import { SnowcastClient } from "../model/snowcast_grpc_web_pb"
import { concatTypedArrays } from "../utils/array";
import { Message } from "../App";

const client = new SnowcastClient("http://localhost:3333", null, null)

export async function sayHello(userId: string, addToMsgList: (m: Message) => void) {
      const request = new proto.snowcast.HelloRequest();
      request.setUserid(userId)
      const stream = client.sayHello(request, null)

      let buf = new Uint8Array(0)

      stream.on("data", async (data: any) => {

            if (data.getMsgtype() == 0) {
                  addToMsgList({ From: data.getFrom(), Message: data.getStringmsg() })
            } else {

                  if (data.getTag() == 1) {
                        // start tag marked
                        buf = new Uint8Array(0)
                  }
                  console.log(data)
                  // console.log(data.getAudiomsg())
                  buf = concatTypedArrays(buf, data.getAudiomsg())

                  if (data.getTag() == 2) {
                        // end tag marked
                        console.log("end tag marked")
                        console.log(buf)
                        const audioCtx = new AudioContext();
                        const source = new AudioBufferSourceNode(audioCtx)
                        // audioCtx.decodeAudioData(buf.buffer)
                        //       .then((decodedData) => {
                        //             source.connect(audioCtx.destination)
                        //             source.start()
                        //       })
                        //       .catch((err) => {
                        //             console.log(err)
                        //       })
                        source.buffer = await audioCtx.decodeAudioData(buf.buffer)
                        source.connect(audioCtx.destination)
                        source.start()
                  }
            }


      });

      stream.on("status", (status: any) => {
            console.log(status.code, status.details, status.metadata);
      });

      stream.on("end", async function () {
            console.log('end')
      });
}

export async function broadcastMessage(userId: string, msg: string) {
      const message = new proto.snowcast.Message
      message.setFrom(userId)
      message.setMsgtype(0)
      message.setStringmsg(msg)
      // message.setTime()

      client.broadcastMessage(message, null, (response, err) => {
            // console.log(response)
      })
}

const chunkSize = 1024
export async function broadcastMusicFile(userId: string, music: File) {

      for (let start = 0; start < music.size; start += chunkSize) {
            const buffer = music.slice(start, start + chunkSize)
            const buf = await buffer.arrayBuffer()
            const bufArray = new Uint8Array(buf)

            const message = new proto.snowcast.Message
            message.setFrom(userId)
            message.setMsgtype(1)
            message.setAudiomsg(bufArray)
            if (start == 0) {
                  message.setTag(1)
            } else if (start + chunkSize > music.size) {
                  message.setTag(2)
            } else {
                  message.setTag(0)
            }
            client.broadcastMessage(message, null, (response, err) => {
                  // console.log(response)
            })
      }


}
