# Build the Go server
FROM golang:latest AS server
WORKDIR /app
COPY server .
RUN go get ./...
RUN go build -o server .

# Build the React client
FROM node:latest AS client
WORKDIR /app
COPY client .
RUN npm install
RUN npm run build

# Build the final image
FROM envoyproxy/envoy-dev:latest
COPY envoy/envoy.yaml /etc/envoy/envoy.yaml
RUN chmod go+r /etc/envoy/envoy.yaml
COPY --from=server /app/server /app/server
COPY --from=client /app/build /app/build
WORKDIR /app
CMD ["./server"]