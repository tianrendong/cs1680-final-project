FROM golang:alpine

WORKDIR /app/server

COPY go.mod ./

RUN go get ./...

COPY . .

RUN go build -o out

EXPOSE 8000

CMD [ "./out" ]