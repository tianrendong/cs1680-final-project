package util

import (
	"log"
	"os"
	"strings"
)

func GetMusicFileNames() []string {
	dir, err := os.Open("./mp3")
	if err != nil {
		log.Fatal(err)
	}

	files, err := dir.Readdir(0)
	if err != nil {
		log.Fatal(err)
	}

	musicFiles := []string{}
	for _, f := range files {
		if !f.IsDir() {
			// trim the suffix from file name
			music := f.Name()[:strings.IndexByte(f.Name(), '.')]
			musicFiles = append(musicFiles, music)
		}
	}

	return musicFiles
}
