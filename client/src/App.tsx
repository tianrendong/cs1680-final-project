import './App.scss'
import { useEffect, useState } from "react"
import { MessageUpdate, Message } from "./model/snowcast_pb"
import { fetchMessages } from "./api/api"
import Login from './components/login/Login'
import Chatbox from './components/chatbox/Chatbox'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function App() {
  const [msgList, setMsgList] = useState<Message[]>([])
  const [playlist, setPlaylist] = useState<string[]>([])
  const [nextMsg, setNextMsg] = useState<number>(0)
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(false)
  const [announcement, setAnnouncement] = useState<string>("")
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    loggedIn && fetchMessages(nextMsg)
      .then((messages: Message[]) => {
        console.log(messages)
        setMsgList(msgList.concat(messages))
        setNextMsg(nextMsg + messages.length)
      })
      .catch((err) => console.log(err))
  }, [loggedIn])
  async function handleMessageUpdate(update: MessageUpdate) {
    console.log(update.getLatestmsg())
    if (update.getLatestmsg() >= nextMsg) {
      fetchMessages(nextMsg)
        .then((messages: Message[]) => {
          console.log(messages)
          setMsgList(msgList.concat(messages))
          setNextMsg(nextMsg + messages.length)
        })
        .catch((err) => console.log(err))
    }
    if (update.hasAnnouncement()) {
      setAnnouncement(update.getAnnouncement())
      setShowAnnouncement(true)
    }
  }

  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    setShowAnnouncement(false);
    setAnnouncement("");
  };

  return (
    <div className="container">
      {sessionStorage.getItem("username") == null ?
        <Login handleMessageUpdate={handleMessageUpdate} setPlaylist={setPlaylist} setLoggedIn={setLoggedIn} /> :
        <Chatbox msgList={msgList} playlist={playlist} />}
      <Snackbar open={showAnnouncement} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {announcement}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App;
