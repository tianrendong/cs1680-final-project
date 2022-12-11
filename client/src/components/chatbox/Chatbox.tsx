import "./Chatbox.scss";
import { useState } from "react";
import { Message, MessageType } from "../../model/snowcast_pb"
import { MusicMessage, TextMessage } from "../message/Message";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { sendMessage } from "../../api/api";

interface ChatboxProps {
      msgList: Message[]
      playlist: string[]
}

function Chatbox(props: ChatboxProps) {
      const username = window.localStorage.getItem("username")
      const [msgToSend, setMsgToSend] = useState<string>("")
      const [showPlaylist, setShowPlaylist] = useState<boolean>(false)

      function sendMusic(music: string) {
            const username = window.localStorage.getItem("username")
            username && sendMessage(username, MessageType.MUSIC, music).then(() => setShowPlaylist(false))
      }

      const keydownHandler = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                  e.preventDefault()
                  if (msgToSend == "") {
                        return
                  }
                  const username = window.localStorage.getItem("username")
                  username && sendTextMessage()
            }
      }

      function sendTextMessage() {
            const username = window.localStorage.getItem("username")
            username && sendMessage(username, MessageType.MESSAGE, msgToSend)
                  .then(() => { setMsgToSend("") })
      }

      return <div className="chatbox">
            <div className="username">logged in as {username}</div>
            <div className="messages">
                  {props.msgList.map((msg: Message, index: number) =>
                        <div className="message-wrapper" style={{ justifyContent: msg.getSender() == username ? "flex-end" : "flex-start" }}>
                              {msg.getType() == MessageType.MESSAGE && <TextMessage Message={msg} />}
                              {msg.getType() == MessageType.MUSIC && <MusicMessage Message={msg} />}
                        </div>
                  )
                  }
            </div>
            <div className="bottom">
                  <div className="send-message">
                        <input
                              placeholder="send message"
                              value={msgToSend}
                              onFocus={() => { setShowPlaylist(false) }}
                              onChange={(e) => { setMsgToSend(e.target.value as string) }}
                              onKeyDown={keydownHandler}
                        ></input>
                        <IconButton onClick={() => { sendTextMessage() }} color="primary" aria-label="upload picture" component="label">
                              <SendIcon sx={{ color: '#808080', fontSize: 'medium' }} />
                        </IconButton>
                        <IconButton onClick={() => { setShowPlaylist(true) }} color="primary" aria-label="upload picture" component="label">
                              <QueueMusicIcon sx={{ color: '#808080' }} />
                        </IconButton>
                  </div>
                  {showPlaylist && <div className="playlist">
                        {props.playlist.map((song: string, index: number) =>
                              <div className="song" onClick={() => { sendMusic(song) }}>{song}</div>)}
                  </div>}
            </div>
      </div>
}

export default Chatbox