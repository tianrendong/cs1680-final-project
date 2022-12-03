# cs1680-final-project

## How to Run
- If running for the first time, build docker image: inside client directory, `make docker`
- If any changes are made to the files in `model`, run `make build` in root directory to compile
- Start envoy (proxy): `make envoy`
- Start server: inside server directory, `go run main.go`
- Start client: inside client directory, `npm start`