import './App.css'
import { useRef, useState, useEffect } from "react"
import { sayHello, broadcastMessage, broadcastMusicFile } from "./api/api"

interface Message {

}

function App() {
  const [file, setFile] = useState<File | null>(null)

  // Create a reference to the hidden file input element
  const [msgList, setMsgList] = useState<string[]>([]);

  useEffect(() => {
    sayHello("jenny", addToMsgList)
  }, [])

  function addToMsgList(msg: string) {
    setMsgList(msgList => [...msgList, msg])
  }

  function sendMessage(msg: string) {
    broadcastMessage("jenny", msg)
  }

  function handleUpload() {
    if (file) {
      broadcastMusicFile("jenny", file)
    }

  }


  function handleChangeInput(event: any) {
    setFile(event.target.files[0])
  }

  return (
    <div>
      {msgList.map((msg, index) => <div>{msg}</div>)}
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
