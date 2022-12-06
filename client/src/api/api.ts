import { SnowcastClient } from "../model/snowcast_grpc_web_pb"
import { concatTypedArrays } from "../utils/array";

const client = new SnowcastClient("http://localhost:3333", null, null)

export async function sayHello(userId: string, addToMsgList: (m: string) => void) {
      const request = new proto.snowcast.HelloRequest();
      request.setUserid(userId)
      const stream = client.sayHello(request, null)

      stream.on("data", (data: any) => {
            if (data.getMsgtype() == 0) {
                  addToMsgList(data.getStringmsg())
            }

            console.log(data)
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

      console.log(music.size)

      for (let start = 0; start < music.size; start += chunkSize) {
            const chunk: Blob = music.slice(start, start + chunkSize + 1)
            const buffer: ArrayBuffer = await chunk.arrayBuffer()
            const buf: Uint8Array = new Uint8Array(buffer)
            const message = new proto.snowcast.Message
            message.setFrom(userId)
            message.setMsgtype(1)
            message.setAudiomsg(buf)
            client.broadcastMessage(message, null, (response, err) => {
                  // console.log(response)
            })
      }


}

// export async function getSong(song: string) {
//       const request = new proto.snowcast.PlaySongRequest()
//       request.setSong(song)

//       const stream = client.playSong(request, null)

//       let buf = new Uint8Array(0)
//       stream.on("data", (data: any) => {
//             buf = concatTypedArrays(buf, data.array[0])
//       });

//       const audioCtx = new AudioContext();
//       const source = new AudioBufferSourceNode(audioCtx)
//       stream.on("end", async function () {
//             source.buffer = await audioCtx.decodeAudioData(buf.buffer)
//             source.connect(audioCtx.destination)
//       });
//       return new Promise((resolve) => { resolve(source) })
// }
