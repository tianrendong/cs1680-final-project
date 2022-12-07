package services

import (
	"context"
	"fmt"
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
	Connections map[string]*Connection
	pb.UnimplementedSnowcastServer
}

func (s *SnowcastService) SayHello(request *pb.HelloRequest, stream pb.Snowcast_SayHelloServer) error {
	log.Printf("User %v logged in\n", request.UserId)
	conn := &Connection{
		stream:    stream,
		userId:    request.UserId,
		errorChan: make(chan error),
	}
	if _, ok := s.Connections[request.UserId]; ok {
		return fmt.Errorf("user with id %v already exists", request.UserId)
	} else {
		s.Connections[request.UserId] = conn
	}

	return <-conn.errorChan
}

func (s *SnowcastService) BroadcastMessage(ctx context.Context, message *pb.Message) (*emptypb.Empty, error) {
	wait := sync.WaitGroup{}
	done := make(chan int)

	for _, conn := range s.Connections {
		wait.Add(1)

		go func(msg *pb.Message, conn *Connection) {
			defer wait.Done()

			err := conn.stream.Send(msg)
			log.Printf("Sending message to: %v\n", conn.stream)

			if err != nil {
				log.Printf("Error with Stream: %v - Error: %v\n", conn.stream, err)
				delete(s.Connections, conn.userId)
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
