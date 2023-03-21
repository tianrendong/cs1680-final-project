import "./Message.scss"
import { fetchMusic } from "../../api/api"
import { Message } from "../../model/snowcast_pb"
import { useState } from "react"
interface MessageProps {
      Message: Message
}

enum MusicStatus {
      UNLOADED = 0,
      LOADING = 1,
      PLAYING = 2,
}

export function TextMessage(props: MessageProps) {
      return <div className="text-message">
            <div className="sender">{props.Message.getSender()}</div>
            <div className="bodytext">{props.Message.getMessage()}</div>
      </div>
}

export function MusicMessage(props: MessageProps) {
      const sender = props.Message.getSender()
      const musicName = props.Message.getMessage()
      const [status, setStatus] = useState<MusicStatus>(MusicStatus.UNLOADED)
      const [audio, setAudio] = useState<AudioBufferSourceNode | null>(null)

      async function playMusic(music: string) {
            setStatus(MusicStatus.LOADING)
            fetchMusic(music).then((audioNode: AudioBufferSourceNode) => {
                  setStatus(MusicStatus.PLAYING)
                  setAudio(audioNode)
                  audioNode.start()
            })
      }

      function stopMusic() {
            audio && audio.stop()
            setStatus(MusicStatus.UNLOADED)
      }

      return <div className="music-message">
            <div className="sender">{sender}</div>
            <div className="bodytext">
                  <div className="play-icon" onClick={() => { status === MusicStatus.PLAYING ? stopMusic() : playMusic(musicName) }}>
                        <svg height="90%" width="auto" viewBox="0 0 237 237" fill="none" xmlns="http://www.w3.org/2000/svg" >
                              {status === MusicStatus.PLAYING ?
                                    // stop icon
                                    <rect className="center" x="72" y="72" width="93" height="93" fill="#F9195C" /> :
                                    // play icon
                                    <path className="center" d="M90 168V69L168 119L90 168Z" fill="#FE2257" />}
                              <circle className="circle" cx="118.5" cy="118.5" r="116" stroke="#FE2257" stroke-width="10" />
                        </svg>


                  </div>
                  <div className="text">
                        <div>{musicName}</div>
                        <div className="loading">
                              {status === MusicStatus.LOADING && "Loading..."}
                        </div>
                  </div>

            </div>

      </div>
}