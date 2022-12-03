package services

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/jennyyu212/cs1680-final-project/pb"
	"github.com/jennyyu212/cs1680-final-project/pkg/util"
)

type SnowcastService struct {
	pb.UnimplementedSnowcastServer
}

func (s *SnowcastService) SayHello(ctx context.Context, request *pb.HelloRequest) (*pb.WelcomeReply, error) {
	files := util.GetMusicFileNames()
	return &pb.WelcomeReply{Songs: files}, nil
}

func (s *SnowcastService) PlaySong(request *pb.PlaySongRequest, stream pb.Snowcast_PlaySongServer) error {
	fmt.Printf("Play Song %v\n", request.GetSong())
	song := request.GetSong() + ".mp3"
	file, err := os.Open("./mp3/" + song)
	if err != nil {
		log.Fatal(err)
	}

	buf := make([]byte, 1024)

	for {
		n, err := file.Read(buf)
		if err == io.EOF {
			return nil
		}
		if err != nil {
			log.Printf("Error reading music file: %v\n", err)
			return err
		}
		if n > 0 {
			reply := &pb.PlaySongReply{Data: buf}
			if err := stream.Send(reply); err != nil {
				return err
			}
		}

	}

}
