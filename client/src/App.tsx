import './App.css'
import { useRef, useState, useEffect } from "react"
import { sayHello, broadcastMessage, broadcastMusicFile } from "./api/api"

export interface Message {
  From: string,
  Message?: string,
  Music?: File,
}

function App() {
  const [username, setUsername] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)

  // Create a reference to the hidden file input element
  const [msgList, setMsgList] = useState<Message[]>([]);

  function handleLogin() {
    sayHello(username, addToMsgList)
  }

  function addToMsgList(msg: Message) {
    setMsgList(msgList => [...msgList, msg])
  }

  function sendMessage(msg: string) {
    broadcastMessage(username, msg)
  }

  function handleUpload() {
    if (file) {
      broadcastMusicFile(username, file)
    }
  }


  function handleChangeInput(event: any) {
    setFile(event.target.files[0])
  }

  return (
    <div>

      <h1>log in</h1>
      <input placeholder="Enter username" onChange={(e) => { setUsername(e.target.value as string) }}></input>
      <button onClick={handleLogin}>Log in</button>

      <h1>send messages</h1>
      {msgList.map((msg, index) => <div>{msg.From}: {msg.Message ? msg.Message : ""}</div>)}
      <button onClick={() => { sendMessage("hey") }}>send message</button>
      <input
        type="file"
        accept="audio/mpeg3"
        onChange={handleChangeInput}
      />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
}

export default App;
