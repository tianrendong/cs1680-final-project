import './App.css'
import { useState, useEffect } from "react"
import { sayHello, playSong } from "./api/api"

function App() {
  const [songs, setSongs] = useState<string[]>([])

  useEffect(() => {
    // say Hello to server and get playlist from data
    sayHello()
      .then((songs) => {
        setSongs(songs as string[])
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  function clickSong(song: string) {
    playSong(song)
    // TODO: play out sound
  }

  return (
    <div>
      {songs.map((song, idx) =>
        <div onClick={() => clickSong(song)}>{song}</div>
      )}
    </div>
  );
}

export default App;
