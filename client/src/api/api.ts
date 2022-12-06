import { SnowcastClient } from "../model/snowcast_grpc_web_pb"
import { concatTypedArrays } from "../utils/array";

const client = new SnowcastClient("http://localhost:3333", null, null)

export async function sayHello(userId: string, addToMsgList: (m: string) => void) {
      const request = new proto.snowcast.HelloRequest();
      request.setUserid(userId)
      const stream = client.sayHello(request, null)

      let buf = new Uint8Array(0)

      stream.on("data", async (data: any) => {

            if (data.getMsgtype() == 0) {
                  addToMsgList(data.getStringmsg())
            } else {

                  if (data.getTag() == 1) {
                        // start tag marked
                        buf = new Uint8Array(0)
                  }

                  console.log(data.getAudiomsg())
                  buf = concatTypedArrays(buf, data.getAudiomsg())

                  if (data.getTag() == 2) {
                        // end tag marked
                        console.log("end tag marked")
                        // console.log(buf.buffer)
                        const audioCtx = new AudioContext();
                        const source = new AudioBufferSourceNode(audioCtx)
                        source.buffer = await audioCtx.decodeAudioData(withWaveHeader(buf.buffer, 2, 14400))
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

      for (let start = 0; start < music.size; start += chunkSize) {
            const chunk: Blob = music.slice(start, start + chunkSize + 1)
            const buffer: ArrayBuffer = await chunk.arrayBuffer()
            const buf: Uint8Array = new Uint8Array(buffer)
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

const withWaveHeader = (data: any, numberOfChannels: any, sampleRate: any) => {
      const header = new ArrayBuffer(44);

      const d = new DataView(header);

      d.setUint8(0, "R".charCodeAt(0));
      d.setUint8(1, "I".charCodeAt(0));
      d.setUint8(2, "F".charCodeAt(0));
      d.setUint8(3, "F".charCodeAt(0));

      d.setUint32(4, data.byteLength / 2 + 44, true);

      d.setUint8(8, "W".charCodeAt(0));
      d.setUint8(9, "A".charCodeAt(0));
      d.setUint8(10, "V".charCodeAt(0));
      d.setUint8(11, "E".charCodeAt(0));
      d.setUint8(12, "f".charCodeAt(0));
      d.setUint8(13, "m".charCodeAt(0));
      d.setUint8(14, "t".charCodeAt(0));
      d.setUint8(15, " ".charCodeAt(0));

      d.setUint32(16, 16, true);
      d.setUint16(20, 1, true);
      d.setUint16(22, numberOfChannels, true);
      d.setUint32(24, sampleRate, true);
      d.setUint32(28, sampleRate * 1 * 2);
      d.setUint16(32, numberOfChannels * 2);
      d.setUint16(34, 16, true);

      d.setUint8(36, "d".charCodeAt(0));
      d.setUint8(37, "a".charCodeAt(0));
      d.setUint8(38, "t".charCodeAt(0));
      d.setUint8(39, "a".charCodeAt(0));
      d.setUint32(40, data.byteLength, true);

      return concat(header, data);
};

const concat = (buffer1: any, buffer2: any) => {
      const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

      tmp.set(new Uint8Array(buffer1), 0);
      tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

      return tmp.buffer;
};