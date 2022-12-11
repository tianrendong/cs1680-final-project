import './App.scss'
import React, { useRef, useState, useEffect } from "react"
import { User, MessageUpdate, MessageType, Message, Messages, Music } from "./model/snowcast_pb"
import { connect, fetchMessages, getPlaylist, sendMessage } from "./api/api"
import { TextMessage, MusicMessage } from './components/message/Message';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import IconButton from '@mui/material/IconButton';
import Login from './components/login/Login';
import Chatbox from './components/chatbox/Chatbox';


function App() {
  const [msgList, setMsgList] = useState<Message[]>([]);
  const [playlist, setPlaylist] = useState<string[]>([]);
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
      <Login handleMessageUpdate={handleMessageUpdate} setPlaylist={setPlaylist} />

      <Chatbox msgList={msgList} playlist={playlist} />

    </div>

  );
}

export default App;
