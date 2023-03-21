FROM envoyproxy/envoy-dev:latest

COPY envoy.yaml /etc/envoy/envoy.yaml

RUN chmod go+r /etc/envoy/envoy.yaml

EXPOSE 3333
EXPOSE 9901