package services

import (
	"context"
	"log"
	"sync"

	"github.com/jennyyu212/cs1680-final-project/pb"
	"google.golang.org/protobuf/types/known/emptypb"
)

type Connection struct {
	stream    pb.Snowcast_SayHelloServer
	userId    string
	errorChan chan error
}

type SnowcastService struct {
	Connections []*Connection
	pb.UnimplementedSnowcastServer
}

func (s *SnowcastService) SayHello(request *pb.HelloRequest, stream pb.Snowcast_SayHelloServer) error {
	log.Printf("User %v logged in\n", request.UserId)
	conn := &Connection{
		stream: stream,
		userId: request.UserId,
		// ErrorChan: make(chan error),
	}
	s.Connections = append(s.Connections, conn)

	// return nil
	return <-conn.errorChan
}

func (s *SnowcastService) BroadcastMessage(ctx context.Context, message *pb.Message) (*emptypb.Empty, error) {
	wait := sync.WaitGroup{}
	done := make(chan int)

	// fmt.Println(message.GetAudioMsg())

	for _, conn := range s.Connections {
		wait.Add(1)

		go func(msg *pb.Message, conn *Connection) {
			defer wait.Done()

			err := conn.stream.Send(msg)
			log.Printf("Sending message to: %v\n", conn.stream)

			if err != nil {
				log.Printf("Error with Stream: %v - Error: %v\n", conn.stream, err)
				conn.errorChan <- err
			}

		}(message, conn)
	}

	go func() {
		wait.Wait()
		close(done)
	}()

	<-done
	return &emptypb.Empty{}, nil
}

// func (s *SnowcastService) PlaySong(request *pb.PlaySongRequest, stream pb.Snowcast_PlaySongServer) error {
// 	fmt.Printf("Play Song %v\n", request.GetSong())
// 	song := request.GetSong() + ".mp3"
// 	file, err := os.Open("./mp3/" + song)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	buf := make([]byte, 1024)

// 	for {
// 		n, err := file.Read(buf)
// 		if err == io.EOF {
// 			return nil
// 		}
// 		if err != nil {
// 			log.Printf("Error reading music file: %v\n", err)
// 			return err
// 		}
// 		if n > 0 {
// 			reply := &pb.PlaySongReply{Data: buf}
// 			if err := stream.Send(reply); err != nil {
// 				return err
// 			}
// 		}

// 	}

// }
