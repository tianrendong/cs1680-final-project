package snowcast

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"sync"

	"github.com/google/uuid"
	"github.com/jennyyu212/cs1680-final-project/pb"
	"google.golang.org/protobuf/types/known/emptypb"
)

const (
	FILES_FOLDER = "./files/"
	CHUNK_SIZE   = 1024
)

type Connection struct {
	userId string
	conn   pb.Snowcast_ConnectServer
	errCh  chan error
}

type File struct {
	id   string
	name string
}

type SnowcastService struct {
	connections map[string]*Connection

	messages    []*pb.Message
	latestIndex int
	msgLock     sync.RWMutex

	files     map[string]File
	filesLock sync.RWMutex

	pb.UnimplementedSnowcastServer
}

func NewService() *SnowcastService {
	return &SnowcastService{
		connections: make(map[string]*Connection),
		messages:    make([]*pb.Message, 0),
		files:       make(map[string]File),
	}
}

func (s *SnowcastService) Connect(request *pb.User, connection pb.Snowcast_ConnectServer) error {
	log.Printf("User %v connected and listening\n", request.GetUserId())

	conn := &Connection{
		userId: request.GetUserId(),
		conn:   connection,
		errCh:  make(chan error),
	}

	if _, ok := s.connections[request.GetUserId()]; !ok {
		s.connections[request.UserId] = conn
	} else {
		return fmt.Errorf("user with id %v already exists", request.UserId)
	}

	return <-conn.errCh
}

func (s *SnowcastService) SendMessage(ctx context.Context, message *pb.Message) (*emptypb.Empty, error) {
	log.Printf("User %v sent message: %v\n", message.GetUser(), message.GetMessage())

	s.msgLock.Lock()
	s.messages = append(s.messages, message)
	s.latestIndex++
	s.msgLock.Unlock()

	i := new(int32)
	*i = int32(s.latestIndex)
	notification := &pb.Notification{
		Type:      pb.NotificationType_MESSAGE,
		LatestMsg: i,
	}

	for _, conn := range s.connections {
		if err := conn.conn.Send(notification); err != nil {
			return nil, err
		}
	}

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

func (s *SnowcastService) SendFile(connection pb.Snowcast_SendFileServer) error {
	chunk, err := connection.Recv()
	if err != nil {
		return err
	}
	id := uuid.New().String()
	fileName := chunk.GetFileName()
	f, e := os.Create(FILES_FOLDER + id + fileName)
	if e != nil {
		return e
	}

	for {
		chunk, err = connection.Recv()
		if err != nil {
			if err != io.EOF {
				return err
			}
			break
		}
		f.Write(chunk.GetChunk())
	}

	file := File{id: id, name: fileName}
	s.filesLock.Lock()
	s.files[id] = file
	s.filesLock.Unlock()

	return nil
}

func (s *SnowcastService) FetchFile(request *pb.FileRequest, connection pb.Snowcast_FetchFileServer) error {
	id := request.GetFileId()
	s.filesLock.RLock()
	file := s.files[id]
	s.filesLock.RUnlock()

	f, err := os.Open(FILES_FOLDER + file.id + file.name)
	if err != nil {
		return err
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

		if err := connection.Send(&pb.FileChunk{
			Chunk: chunk[:n],
		}); err != nil {
			return err
		}

		chunk = make([]byte, CHUNK_SIZE)
	}

	return nil
}
