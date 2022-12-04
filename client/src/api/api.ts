
import { SnowcastClient } from "../model/snowcast_grpc_web_pb"

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

function concatTypedArrays(a: Uint8Array, b: Uint8Array) {
      var c = new Uint8Array(a.length + b.length);
      c.set(a, 0);
      c.set(b, a.length);
      return c;
}

export async function playSong(song: string) {
      const request = new proto.snowcast.PlaySongRequest()
      request.setSong(song)

      const stream = client.playSong(request, null)

      let buf = new Uint8Array(0)
      stream.on("data", (data: any) => {
            buf = concatTypedArrays(buf, data.array[0])
      });

      stream.on("end", async function () {
            const audioCtx = new AudioContext();
            const source = new AudioBufferSourceNode(audioCtx)
            source.buffer = await audioCtx.decodeAudioData(buf.buffer)
            source.connect(audioCtx.destination)
            source.start(0)
      });
}
