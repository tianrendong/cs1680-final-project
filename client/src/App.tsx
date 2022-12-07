import './App.css'
import { useRef, useState, useEffect } from "react"
import { sayHello, broadcastMessage, broadcastFile } from "./api/api"
import { messageType } from './model/model';
import TextFile from './components/TextFile';

export interface MessageDisplay {
  From: string;
  MsgType: messageType;
  Text?: string,
  Music?: AudioBufferSourceNode,
  TextFile?: string,
}


function App() {
  const [username, setUsername] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)

  const [msgList, setMsgList] = useState<MessageDisplay[]>([]);

  function handleLogin() {
    sayHello(username, addToMsgList)
  }

  function addToMsgList(msg: MessageDisplay) {
    setMsgList(msgList => [...msgList, msg])
  }

  function sendMessage(msg: string) {
    broadcastMessage(username, msg)
  }

  function handleUpload() {
    if (file) {
      const fileType = file.type.split("/")[0]
      if (fileType == "text") {
        broadcastFile(username, file, messageType.TEXTFILE)
      } else if (fileType == "audio") {
        broadcastFile(username, file, messageType.SONG)
      }
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
          <div> {msg.From}: </div>
          {msg.MsgType == messageType.TEXTFILE ? <TextFile Msg={msg} /> : ""}
          {msg.MsgType == messageType.TEXT ? msg.Text : ""}
        </div>

      )}

      <h1>send messages</h1>
      <input placeholder="Enter message" onChange={(e) => { setMessage(e.target.value as string) }}></input>
      <button onClick={() => { sendMessage(message) }}>send message</button>

      <input
        type="file"
        accept="audio/mpeg3,.txt"
        onChange={(e) => { setFile(e.target!.files![0]) }}
      />
      <button onClick={handleUpload}>send file</button>
    </div>
  );
}

export default App;
