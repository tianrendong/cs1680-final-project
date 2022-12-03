
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

export async function playSong(song: string) {
      const request = new proto.snowcast.PlaySongRequest()
      request.setSong(song)

      const stream = client.playSong(request, null)

      stream.on("data", (data: any) => {
            console.log(data)
      });

      stream.on("end", function () {
            console.log("end");
      });
}
