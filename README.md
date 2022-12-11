# cs1680-final-project

## Chat App with gRPC and React
A chat app where users can broadcast text messages and music that is available on the server. Music can be played out in browsers.

## How to Run
- If running for the first time, build docker image: inside client directory, `make docker`
- If any changes are made to the message or service definitions in `./model`, run `make proto` in root directory to compile
- Start envoy proxy: `make start_envoy`
- Start server: `make server`
- Start client: `make client`