import "./Login.scss"
import React, { useState } from "react"
import { connect, getPlaylist } from "../../api/api"
import { MessageUpdate, Music } from "../../model/snowcast_pb"
import LoginIcon from '@mui/icons-material/Login'
import IconButton from '@mui/material/IconButton'

interface LoginProps {
      handleMessageUpdate: (update: MessageUpdate) => void
      setPlaylist: (playlist: string[]) => void
      setLoggedIn: (loggedIn: boolean) => void
}

function Login(props: LoginProps) {
      const [username, setUsername] = useState<string>("")

      async function handleLogin() {
            connect(username, props.handleMessageUpdate)
            sessionStorage.setItem("username", username.toString())
            props.setLoggedIn(true)
            getPlaylist()
                  .then((playlist: Music[]) => {
                        props.setPlaylist(playlist.map(music => music.getName()))
                  })
                  .catch((err) => console.log(err))
      }

      const keydownHandler = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                  e.preventDefault()
                  handleLogin()
            }
      }

      return <div className="login">
            <input className="input-box" placeholder="Enter username" onChange={(e) => { setUsername(e.target.value as string) }} onKeyDown={keydownHandler}></input>
            <IconButton onClick={handleLogin} color="primary" aria-label="upload picture" component="label">
                  <LoginIcon sx={{ color: '#808080' }} />
            </IconButton>
      </div>

}

export default Login