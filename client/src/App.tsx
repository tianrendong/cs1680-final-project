import './App.css'
import { useRef, useState, useEffect } from "react"
import { User, MessageUpdate, MessageType, Message, Messages, Music } from "./model/snowcast_pb"
import { connect, fetchMessages, getPlaylist, sendMessage } from "./api/api"
import { TextMessage, MusicMessage } from './components/Message';


function App() {
  const [username, setUsername] = useState<string>("")
  const [msgToSend, setMsgToSend] = useState<string>("")
  const [msgList, setMsgList] = useState<Message[]>([]);
  const [playlist, setPlaylist] = useState<Music[]>([]);
  const [latestMsgFetched, setLatestMsgFetched] = useState<number>(0)

  async function handleLogin() {
    connect(username, handleMessageUpdate)
    console.log("got here")
    getPlaylist()
      .then((playlist: Music[]) => {
        setPlaylist(playlist)
      })
      .catch((err) => console.log(err))
  }

  function sendTextMessage(msg: string) {
    sendMessage(username, MessageType.MESSAGE, msg)
  }

  function sendMusic(music: string) {
    sendMessage(username, MessageType.MUSIC, music)
  }

  async function handleMessageUpdate(update: MessageUpdate) {
    if (update.getLatestmsg() > latestMsgFetched) {
      fetchMessages(latestMsgFetched + 1)
        .then((messages: Message[]) => {
          setMsgList(msgList.concat(messages))
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div>
      <h1>log in</h1>
      <input placeholder="Enter username" onChange={(e) => { setUsername(e.target.value as string) }}></input>
      <button onClick={handleLogin}>Log in</button>

      <h1>messages</h1>
      {msgList.map((msg, index) =>
        <div>
          {msg.getType() == MessageType.MESSAGE && <TextMessage Message={msg} />}
          {msg.getType() == MessageType.MUSIC && <MusicMessage Message={msg} />}
        </div>
      )
      }

      <h1>send messages</h1>
      <input placeholder="Enter message" onChange={(e) => { setMsgToSend(e.target.value as string) }}></input>
      <button onClick={() => { sendTextMessage(msgToSend) }}>send message</button>
    </div>
  );
}

export default App;
