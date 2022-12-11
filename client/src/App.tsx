import './App.scss'
import React, { useRef, useState, useEffect } from "react"
import { User, MessageUpdate, MessageType, Message, Messages, Music } from "./model/snowcast_pb"
import { connect, fetchMessages, getPlaylist, sendMessage } from "./api/api"
import { TextMessage, MusicMessage } from './components/message/Message';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import IconButton from '@mui/material/IconButton';
import Login from './components/login/Login';


function App() {

  const [msgToSend, setMsgToSend] = useState<string>("")
  const [msgList, setMsgList] = useState<Message[]>([]);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [nextMsg, setNextMsg] = useState<number>(0)

  function sendMusic(music: string) {
    const username = window.localStorage.getItem("username")
    username && sendMessage(username, MessageType.MUSIC, music)
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
      const username = window.localStorage.getItem("username")
      username && sendMessage(username, MessageType.MESSAGE, msgToSend)
        .then(() => { setMsgToSend("") })
    }
  }

  function handleEnterMessage(e: React.ChangeEvent<HTMLInputElement>) {

  }
  return (
    <div className="container">
      <Login handleMessageUpdate={handleMessageUpdate} setPlaylist={setPlaylist} />

      <div className="chatbox">
        <div className="messages">
          {msgList.map((msg, index) =>
            <div>
              {msg.getType() == MessageType.MESSAGE && <TextMessage Message={msg} />}
              {msg.getType() == MessageType.MUSIC && <MusicMessage Message={msg} />}
            </div>
          )
          }
        </div>


        <div className="bottom">
          <div className="send-message">
            <input
              placeholder="Message"
              value={msgToSend}
              onChange={(e) => { setMsgToSend(e.target.value as string) }}
              onKeyPress={handleKeyPress}
            ></input>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <QueueMusicIcon sx={{ color: '#808080' }} />
            </IconButton>
          </div>
          {<div className="playlist">
            {playlist.map((song, index) =>
              <div className="song" onClick={() => { sendMusic(song) }}>{song}</div>)}
          </div>}
        </div>


      </div>

    </div>

  );
}

export default App;
