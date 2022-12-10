package snowcast

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"sync"

	"github.com/jennyyu212/cs1680-final-project/pb"
	"google.golang.org/protobuf/types/known/emptypb"
)

const (
	CHUNK_SIZE = 1024
)

type Connection struct {
	userId string
	stream pb.Snowcast_ConnectServer
	errCh  chan error
}

type SnowcastService struct {
	connections     map[string]*Connection
	connectionsLock sync.RWMutex

	messages    []*pb.Message
	latestIndex int
	msgLock     sync.RWMutex

	pb.UnimplementedSnowcastServer
}

func NewService() *SnowcastService {
	return &SnowcastService{
		connections: make(map[string]*Connection),
		messages:    make([]*pb.Message, 0),
	}
}

func (s *SnowcastService) Connect(request *pb.User, connection pb.Snowcast_ConnectServer) error {
	log.Printf("User %v connected\n", request.GetUserId())

	conn := &Connection{
		userId: request.GetUserId(),
		stream: connection,
		errCh:  make(chan error),
	}

	s.connectionsLock.Lock()
	defer s.connectionsLock.Unlock()
	if _, ok := s.connections[request.GetUserId()]; !ok {
		s.connections[request.UserId] = conn
	} else {
		return fmt.Errorf("user with id %v already exists", request.GetUserId())
	}

	e := <-conn.errCh
	log.Printf("User %v disconnected\n", request.GetUserId())

	s.connectionsLock.Lock()
	delete(s.connections, request.GetUserId())
	s.connectionsLock.Unlock()

	return e
}

func (s *SnowcastService) SendMessage(ctx context.Context, message *pb.Message) (*emptypb.Empty, error) {
	log.Printf("User %v sent message: %v\n", message.GetSender(), message.GetMessage())

	s.msgLock.Lock()
	s.messages = append(s.messages, message)
	s.latestIndex++
	s.msgLock.Unlock()

	notification := &pb.Notification{
		LatestMsg: int32(s.latestIndex),
	}

	var wg sync.WaitGroup
	for _, conn := range s.connections {
		wg.Add(1)
		c := conn
		go func() {
			if e := c.stream.Send(notification); e != nil {
				c.errCh <- e
			}
			wg.Done()
		}()
	}
	wg.Wait()

	return &emptypb.Empty{}, nil
}

func (s *SnowcastService) FetchMessages(ctx context.Context, request *pb.FetchRequest) (*pb.Messages, error) {
	s.msgLock.RLock()
	defer s.msgLock.RUnlock()

	if request.GetStartIndex() >= int32(len(s.messages)) {
		return nil, fmt.Errorf("start index %v is out of range %v", request.GetStartIndex(), len(s.messages))
	}

	return &pb.Messages{
		Messages: s.messages[request.GetStartIndex():],
	}, nil
}

func (s *SnowcastService) FetchMusic(request *pb.Music, connection pb.Snowcast_FetchMusicServer) error {
	f, e := os.Open(request.GetName())
	if e != nil {
		return e
	}

	chunk := make([]byte, CHUNK_SIZE)
	for {
		n, err := f.Read(chunk)
		if err != nil {
			if err != io.EOF {
				return err
			}
			break
		}

		if err = connection.Send(&pb.FileChunk{
			Chunk: chunk[:n],
		}); err != nil {
			return err
		}

		chunk = make([]byte, CHUNK_SIZE)
	}

	return nil
}
