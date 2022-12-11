import "./Message.scss"
import { fetchMusic } from "../api/api"
import { User, MessageUpdate, MessageType, Message, Messages } from "../model/snowcast_pb"
interface MessageProps {
      Message: Message
}

// export function TextMessage(props: any) {
//       return <div className="text-message">
//             {/* <div className="sender">{props.Message.getSender()}</div>
//             <div className="bodytext">{props.Message.getMessage()}</div> */}
//             <div className="sender">{props.Message.sender}</div>
//             <div className="bodytext">{props.Message.message}</div>
//       </div>
// }

export function TextMessage(props: MessageProps) {
      return <div className="text-message">
            <div className="sender">{props.Message.getSender()}</div>
            <div className="bodytext">{props.Message.getMessage()}</div>
      </div>
}

export function MusicMessage(props: MessageProps) {
      const sender = props.Message.getSender()
      const musicName = props.Message.getMessage()

      async function playMusic(music: string) {
            fetchMusic(music).then((audioNode: AudioBufferSourceNode) => audioNode.start())
      }

      return <div className="music-message">
            <div>{sender}</div>
            <div>{musicName}</div>
            <button onClick={() => { playMusic(musicName) }}>play</button>
      </div>
}