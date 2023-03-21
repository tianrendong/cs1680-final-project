package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"os"

	pb "github.com/jennyyu212/cs1680-final-project/pb"
	"github.com/jennyyu212/cs1680-final-project/pkg/snowcast"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
)

func main() {
	flag.Parse()
	godotenv.Load()
	port := os.Getenv("PORT")
	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
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
