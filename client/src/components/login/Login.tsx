import "./Login.scss"
import React, { useRef, useState, useEffect } from "react"
import { connect, getPlaylist } from "../../api/api"
import { MessageUpdate, Music } from "../../model/snowcast_pb"
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';

interface LoginProps {
      handleMessageUpdate: (update: MessageUpdate) => void
      setPlaylist: (playlist: string[]) => void
}
function Login(props: LoginProps) {
      const [username, setUsername] = useState<string>("")

      async function handleLogin() {
            connect(username, props.handleMessageUpdate)
            window.localStorage.setItem("username", username.toString());
            getPlaylist()
                  .then((playlist: Music[]) => {
                        props.setPlaylist(playlist.map(music => music.getName()))
                  })
                  .catch((err) => console.log(err))
      }

      return <div className="login">
            <input className="input-box" placeholder="Enter username" onChange={(e) => { setUsername(e.target.value as string) }}></input>
            <IconButton onClick={handleLogin} color="primary" aria-label="upload picture" component="label">
                  <LoginIcon sx={{ color: '#808080' }} />
            </IconButton>
      </div>

}

export default Login