import React, { useRef, useState, useEffect } from "react"
import { connect, getPlaylist } from "../../api/api"
import { MessageUpdate, Music } from "../../model/snowcast_pb"

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

      return <div>
            <input placeholder="Enter username" onChange={(e) => { setUsername(e.target.value as string) }}></input>
            <button onClick={handleLogin}>Log in</button>
      </div>
}

export default Login