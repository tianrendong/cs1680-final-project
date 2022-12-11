import { useState } from "react";
import { Message, MessageType } from "../../model/snowcast_pb"
import { MusicMessage, TextMessage } from "../message/Message";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import IconButton from '@mui/material/IconButton';
import { sendMessage } from "../../api/api";

interface ChatboxProps {
      msgList: Message[]
      playlist: string[]
}

function Chatbox(props: ChatboxProps) {
      const [msgToSend, setMsgToSend] = useState<string>("")

      function sendMusic(music: string) {
            const username = window.localStorage.getItem("username")
            username && sendMessage(username, MessageType.MUSIC, music)
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

      return <div className="chatbox">
            <div className="messages">
                  {props.msgList.map((msg: Message, index: number) =>
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
                        {props.playlist.map((song: string, index: number) =>
                              <div className="song" onClick={() => { sendMusic(song) }}>{song}</div>)}
                  </div>}
            </div>
      </div>
}

export default Chatbox