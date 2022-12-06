package main

import (
	"flag"
	"log"
	"net"

	pb "github.com/jennyyu212/cs1680-final-project/pb"
	api "github.com/jennyyu212/cs1680-final-project/pkg/api"
	"google.golang.org/grpc"
)

func main() {
	flag.Parse()
	listener, err := net.Listen("tcp", ":8000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	service := &api.SnowcastService{
		Connections: make(map[string]*api.Connection),
	}
	pb.RegisterSnowcastServer(s, service)

	log.Printf("server listening at %v", listener.Addr())
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
