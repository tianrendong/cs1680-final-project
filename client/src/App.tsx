import './App.scss'
import { useState, useEffect } from "react"
import { MessageUpdate, Message } from "./model/snowcast_pb"
import { fetchMessages } from "./api/api"
import Login from './components/login/Login'
import Chatbox from './components/chatbox/Chatbox'


function App() {
  const [msgList, setMsgList] = useState<Message[]>([])
  const [playlist, setPlaylist] = useState<string[]>([])
  const [nextMsg, setNextMsg] = useState<number>(0)

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

  return (
    <div className="container">
      {sessionStorage.getItem("username") == null ?
        <Login handleMessageUpdate={handleMessageUpdate} setPlaylist={setPlaylist} /> :
        <Chatbox msgList={msgList} playlist={playlist} />}
    </div>
  )
}

export default App;
