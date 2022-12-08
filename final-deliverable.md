# CS1680 - Snowcast with GRPC and React
**Members:** Jenny Yu and Tianren Dong

## Project Introduction
The goal of the project is to understand how GRPC works and to set up an 
initial goal of the project was to understand how GRPC works and use it to implement Snowcast. We also wanted to explore setting up the Envoy proxy to connect GRPC with a React frontend. We soon realized that the mp3 format that we used for our music does not support streaming, because a song has to be fully transmitted in order to be decoded and played out. We then decided to change the functionality of the program while using the same tech stack and implemented

A group chat app that allows the transmission of text, text files, and music files between different clients

nderstand how GRPC works and use it to implement Snowcast. For GRPC to work with commonly used frontend frameworks such as React, there needs to be a proxy between frontend and backend. As a stretch goal, we hope to set up the Envoy proxy and implement a React frontend for it.

## Design/Implementation

## Discussion/Results

## Conclusions/Future work

## GRPC
What GRPC is, how it compares to self-implemented protocols, and how it compares to HTTP APIs

## Using Proxy to connect GRPC with Frontend 
How GRPC works with frontend frameworks and how to set up the proxy

## Streaming Music Data


**References:** 
[Grpc](https://grpc.io/docs/languages/go/quickstart/), [Grpc & React Example](https://daily.dev/blog/build-a-chat-app-using-grpc-and-reactjs), [Protobuf](https://developers.google.com/protocol-buffers/docs/overview)