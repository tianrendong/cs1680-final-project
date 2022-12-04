proto:
	protoc --go_out=. --go-grpc_out=. ./model/snowcast.proto 
	protoc --js_out=import_style=commonjs:./client/src/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./client/src/ ./model/snowcast.proto 

envoy:
	cd client; docker build -t cs1680-final-project . ; cd ..

start_envoy:
	cd client; docker run -d --name cs1680-final-project -p 3333:3333 -p 9901:9901 cs1680-final-project

start_server:
	cd server; go run main.go

start_client:
	cd client; npm start