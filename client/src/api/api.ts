import { SnowcastClient } from "../model/snowcast_grpc_web_pb"
import { concatTypedArrays } from "../utils/array";

const client = new SnowcastClient("http://localhost:3333", null, null)

export async function sayHello() {
      const request = new proto.snowcast.HelloRequest();
      return new Promise((resolve, reject) => {
            client.sayHello(request, null, (err, response) => {
                  if (err) reject(err)
                  resolve(response.getSongsList())
            })
      });
}

export async function getSong(song: string) {
      const request = new proto.snowcast.PlaySongRequest()
      request.setSong(song)

      const stream = client.playSong(request, null)

      let buf = new Uint8Array(0)
      stream.on("data", (data: any) => {
            buf = concatTypedArrays(buf, data.array[0])
      });

      const audioCtx = new AudioContext();
      const source = new AudioBufferSourceNode(audioCtx)
      stream.on("end", async function () {
            source.buffer = await audioCtx.decodeAudioData(buf.buffer)
            source.connect(audioCtx.destination)
      });
      return new Promise((resolve) => { resolve(source) })
}
