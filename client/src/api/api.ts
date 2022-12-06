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

      console.log(music.size)
      // const buffer = await music.arrayBuffer()

      for (let start = 0; start < music.size; start += chunkSize) {
            // const chunk = buffer.slice(start, start + chunkSize + 1)
            // const buf = new Uint8Array(chunk)
            // const chunk: Blob = music.slice(start, start + chunkSize + 1, "audio/mpeg3")
            // const buffer: ArrayBuffer = await chunk.arrayBuffer()
            const buffer = await getAsByteArray(music)
            const buf = buffer.slice(start, start + chunkSize + 1)
            // const buf: Uint8Array = new Uint8Array(buffer)
            const message = new proto.snowcast.Message
            message.setFrom(userId)
            message.setMsgtype(1)
            message.setAudiomsg(buf)
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

function readFile(file: File) {
      return new Promise((resolve, reject) => {
            // Create file reader
            let reader = new FileReader()

            // Register event listeners
            reader.addEventListener("loadend", e => resolve(e.target!.result))
            reader.addEventListener("error", reject)

            // Read file
            reader.readAsArrayBuffer(file)
      })
}

async function getAsByteArray(file: File) {
      const bytes = await readFile(file)
      return new Uint8Array(bytes as ArrayBuffer)
}