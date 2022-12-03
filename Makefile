all: envoy

envoy:
	docker run -d --name cs1680-final-project -p 3333:3333 -p 9901:9901 cs1680-final-project

build:
	protoc --go_out=. --go-grpc_out=. ./model/snowcast.proto 
	protoc --js_out=import_style=commonjs:./client/src/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./client/src/ ./model/snowcast.proto 
	# protoc --plugin=./frontend/./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./client/src/ ./model/snowcast.proto 

# run in client folder
docker:
	docker build -t cs1680-final-project . 