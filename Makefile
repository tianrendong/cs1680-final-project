.PHONY: client server

proto:
	protoc --go_out=. --go-grpc_out=. ./model/snowcast.proto 
	protoc --plugin="protoc-gen-ts=./client/node_modules/.bin/protoc-gen-ts" --js_out="import_style=commonjs,binary:./client/src/" --ts_out="./client/src/" ./model/snowcast.proto
	protoc --plugin="protoc-gen-ts=./client/node_modules/.bin/protoc-gen-ts" --js_out="import_style=commonjs,binary:./client/src/" --ts_out="service=grpc-web:./client/src/" ./model/snowcast.proto

proxy:
	cd envoy; docker build -t cs1680-final-project .; docker create --name cs1680-final-project -p 3333:3333 -p 9901:9901 cs1680-final-project; docker start cs1680-final-project; cd ..

stop_envoy:
	docker stop cs1680-final-project

server:
	cd server; go run main.go

client:
	cd client; npm start