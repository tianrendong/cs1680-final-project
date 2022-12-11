import './App.scss'
import React, { useRef, useState, useEffect } from "react"
import { User, MessageUpdate, MessageType, Message, Messages, Music } from "./model/snowcast_pb"
import { connect, fetchMessages, getPlaylist, sendMessage } from "./api/api"
import { TextMessage, MusicMessage } from './components/Message';


function App() {
  const exampleMsg = {
    sender: "jenny",
    type: MessageType.MESSAGE,
    message: "hey!",
  }
  const [username, setUsername] = useState<string>("")
  const [msgToSend, setMsgToSend] = useState<string>("")
  const [msgList, setMsgList] = useState<Message[]>([]);
  const [examplemsgList, setexampleMsgList] = useState([exampleMsg]);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [nextMsg, setNextMsg] = useState<number>(0)

  async function handleLogin() {
    connect(username, handleMessageUpdate)
    console.log("got here")
    getPlaylist()
      .then((playlist: Music[]) => {
        setPlaylist(playlist.map(music => music.getName()))
      })
      .catch((err) => console.log(err))
  }

  function sendMusic(music: string) {
    sendMessage(username, MessageType.MUSIC, music)
  }

  async function handleMessageUpdate(update: MessageUpdate) {
    console.log(update.getLatestmsg())
    if (update.getLatestmsg() >= nextMsg) {
      fetchMessages(nextMsg)
        .then((messages: Message[]) => {
          console.log(messages)
          setMsgList(msgList.concat(messages))
          // TODO: change this to, each message has an index
          setNextMsg(nextMsg + messages.length)
        })
        .catch((err) => console.log(err))
    }
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      sendMessage(username, MessageType.MESSAGE, msgToSend)
        .then(() => { setMsgToSend("") })
    }
  }

  return (
    <div className="container">
      <h1>log in</h1>
      <input placeholder="Enter username" onChange={(e) => { setUsername(e.target.value as string) }}></input>
      <button onClick={handleLogin}>Log in</button>
      <div className="chatbox">
        {msgList.map((msg, index) =>
          <div>
            {msg.getType() == MessageType.MESSAGE && <TextMessage Message={msg} />}
            {msg.getType() == MessageType.MUSIC && <MusicMessage Message={msg} />}
          </div>
        )
        }


        <div className="send-message">
          <input
            placeholder="Enter message"
            value={msgToSend}
            onChange={(e) => { setMsgToSend(e.target.value as string) }}
            onKeyPress={handleKeyPress}
          ></input>
        </div>

      </div>

    </div>

  );
}

export default App;
