package main

import (
	"flag"
	"log"
	"net"

	pb "github.com/jennyyu212/cs1680-final-project/pb"
	"github.com/jennyyu212/cs1680-final-project/pkg/snowcast"
	"google.golang.org/grpc"
)

func main() {
	flag.Parse()
	listener, err := net.Listen("tcp", ":8000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	server := grpc.NewServer()
	service := snowcast.NewService()
	pb.RegisterSnowcastServer(server, service)

	log.Printf("server listening on %v", listener.Addr())
	if err := server.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
