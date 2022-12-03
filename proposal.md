# CS1680 Final Project
**Team members:** Jenny Yu & Tianren Dong 

**Topic:** Implement Snowcast with GRPC and React

**Goal:** Understand how GRPC works and use it to implement Snowcast. For GRPC to work with commonly used frontend frameworks such as React, there needs to be a proxy between frontend and backend. As a stretch goal, we hope to set up the Envoy proxy and implement a React frontend for it. 

**Final Deliverable:**
- What GRPC is, how it compares to self-implemented protocols, and how it compares to HTTP APIs
- How GRPC works with frontend frameworks and how to set up the proxy
- Our learning process

**Questions:**

We did some research about GRPC and understand the basic idea regarding sending and receiving different structured message types, but am not sure how we should approach streaming the song data. 

Previously we used UDP to achieve streaming. Should we encapsulate the streaming data inside the structured protobuf message types too? Would that cause issues with performance? In addition, if we hope to actually play out the song data, what are some resources that we can look into? Thank you!

**References to get started:** 
[Grpc](https://grpc.io/docs/languages/go/quickstart/), [Grpc & React Example](https://daily.dev/blog/build-a-chat-app-using-grpc-and-reactjs), [Protobuf](https://developers.google.com/protocol-buffers/docs/overview)